import { heroes, heroByName } from './heroes';
import { items, itemByName } from './items';
import {
  counterWeight,
  counteredBy,
  itemsVs,
  laneWins,
  synergyWith,
} from './counters';
import type { Hero, Item, Role, Tag } from './types';

export interface HeroSuggestion {
  hero: Hero;
  /** Total draft score — higher is a better pick against the enemy lineup. */
  score: number;
  /** Enemies this hero directly counters. */
  beats: string[];
  /** Enemies this hero out-laned. */
  lanes: string[];
  /** Enemies that counter this hero back (the risk of picking it). */
  risk: string[];
  /** Allies this hero pairs well with (combo synergy). */
  synergy: string[];
}

export interface ItemSuggestion {
  item: Item;
  score: number;
  /** Enemies this item is specifically effective against. */
  against: string[];
}

export interface ThreatReport {
  hero: Hero;
  /** Enemy heroes that counter this ally pick, strongest first. */
  threats: string[];
  /** 0 = safe, higher = more countered. */
  pressure: number;
}

const WEIGHT_LANE = 1.5;
const WEIGHT_RISK = 0.8;
const WEIGHT_WINRATE = 0.12;
const WEIGHT_SYNERGY = 1.3;

/**
 * Rank every unpicked hero against the enemy lineup.
 *
 * Scoring: direct counter relations (weighted by how hard the counter is),
 * plus lane advantages, plus synergy with your own picks, minus how badly the
 * enemy can punish the pick back, plus a small nudge from the hero's public
 * win rate as a tie-breaker.
 */
export function suggestHeroes(
  enemies: string[],
  allies: string[] = [],
  options: { role?: Role | null; limit?: number } = {}
): HeroSuggestion[] {
  const { role = null, limit = 8 } = options;
  if (enemies.length === 0 && allies.length === 0) return [];

  const taken = new Set([...enemies, ...allies]);

  const suggestions = heroes
    .filter((hero) => !taken.has(hero.name))
    .filter((hero) => (role ? hero.roles.includes(role) : true))
    .map<HeroSuggestion>((hero) => {
      const beats: string[] = [];
      const lanes: string[] = [];
      const risk: string[] = [];
      const synergy: string[] = [];
      let score = 0;

      for (const enemy of enemies) {
        const weight = counterWeight(enemy, hero.name);
        if (weight > 0) {
          score += weight;
          beats.push(enemy);
        }
        if (laneWins[hero.name]?.includes(enemy)) {
          score += WEIGHT_LANE;
          lanes.push(enemy);
        }
        const back = counterWeight(hero.name, enemy);
        if (back > 0) {
          score -= back * WEIGHT_RISK;
          risk.push(enemy);
        }
      }

      for (const ally of allies) {
        if (synergyWith[hero.name]?.includes(ally)) {
          score += WEIGHT_SYNERGY;
          synergy.push(ally);
        }
      }

      score += (hero.winRate - 50) * WEIGHT_WINRATE;
      return { hero, score, beats, lanes, risk, synergy };
    })
    .filter((s) => s.beats.length > 0 || s.lanes.length > 0 || s.synergy.length > 0)
    .sort((a, b) => b.score - a.score || b.hero.winRate - a.hero.winRate);

  return suggestions.slice(0, limit);
}

/** Aggregate archetype profile of a lineup — how much of each threat it brings. */
export function lineupProfile(lineup: string[]): Partial<Record<Tag, number>> {
  const profile: Partial<Record<Tag, number>> = {};
  for (const name of lineup) {
    for (const tag of heroByName[name]?.tags ?? []) {
      profile[tag] = (profile[tag] ?? 0) + 1;
    }
  }
  return profile;
}

/**
 * Item build suggestions against an enemy lineup: explicit per-hero counter
 * items first, then archetype-based picks (e.g. two invisible heroes -> Sentry).
 */
export function suggestItems(enemies: string[], limit = 10): ItemSuggestion[] {
  if (enemies.length === 0) return [];

  const scores = new Map<string, { score: number; against: Set<string> }>();
  const bump = (itemName: string, amount: number, enemy?: string) => {
    if (!itemByName[itemName]) return;
    const entry = scores.get(itemName) ?? { score: 0, against: new Set<string>() };
    entry.score += amount;
    if (enemy) entry.against.add(enemy);
    scores.set(itemName, entry);
  };

  for (const enemy of enemies) {
    (itemsVs[enemy] ?? []).forEach((itemName, index) => {
      bump(itemName, index === 0 ? 3.2 : 3, enemy);
    });
  }

  const profile = lineupProfile(enemies);
  for (const item of items) {
    for (const tag of item.counters) {
      const count = profile[tag] ?? 0;
      if (count >= 2) bump(item.name, 1.1 * count);
      else if (count === 1) bump(item.name, 0.5);
    }
  }

  return [...scores.entries()]
    .map<ItemSuggestion>(([name, entry]) => ({
      item: itemByName[name],
      score: entry.score,
      against: [...entry.against],
    }))
    .sort((a, b) => b.score - a.score || b.against.length - a.against.length)
    .slice(0, limit);
}

/** For each of your picks, which enemy heroes punish it. */
export function analyzeThreats(allies: string[], enemies: string[]): ThreatReport[] {
  return allies
    .map<ThreatReport>((name) => {
      const hero = heroByName[name];
      const threats = (counteredBy[name] ?? []).filter((c) => enemies.includes(c));
      const pressure = threats.reduce((sum, t) => sum + counterWeight(name, t), 0);
      return { hero, threats, pressure };
    })
    .filter((report) => Boolean(report.hero))
    .sort((a, b) => b.pressure - a.pressure);
}

export interface DraftAdvantage {
  /** Total counter weight your lineup has over the enemy. */
  allyScore: number;
  /** Total counter weight the enemy has over you. */
  enemyScore: number;
  /** -1 (enemy dominates) … 0 (even) … +1 (you dominate). */
  balance: number;
  /** Your strongest individual matchups, best first. */
  edges: { hero: string; over: string; weight: number }[];
  /** The enemy's strongest individual matchups, worst-for-you first. */
  liabilities: { hero: string; over: string; weight: number }[];
}

/**
 * Head-to-head reading of the two lineups: who out-counters whom overall,
 * plus the individual matchups driving it.
 */
export function draftAdvantage(allies: string[], enemies: string[]): DraftAdvantage {
  const edges: DraftAdvantage['edges'] = [];
  const liabilities: DraftAdvantage['liabilities'] = [];
  let allyScore = 0;
  let enemyScore = 0;

  for (const ally of allies) {
    for (const enemy of enemies) {
      const ours = counterWeight(enemy, ally);
      if (ours > 0) {
        allyScore += ours;
        edges.push({ hero: ally, over: enemy, weight: ours });
      }
      const theirs = counterWeight(ally, enemy);
      if (theirs > 0) {
        enemyScore += theirs;
        liabilities.push({ hero: enemy, over: ally, weight: theirs });
      }
      if (laneWins[ally]?.includes(enemy)) allyScore += WEIGHT_LANE;
      if (laneWins[enemy]?.includes(ally)) enemyScore += WEIGHT_LANE;
    }
  }

  const total = allyScore + enemyScore;
  return {
    allyScore,
    enemyScore,
    balance: total === 0 ? 0 : (allyScore - enemyScore) / total,
    edges: edges.sort((a, b) => b.weight - a.weight).slice(0, 4),
    liabilities: liabilities.sort((a, b) => b.weight - a.weight).slice(0, 4),
  };
}

/** Everything a single hero page needs to explain its matchups. */
export function heroMatchups(name: string) {
  return {
    counteredBy: counteredBy[name] ?? [],
    counters: heroes
      .filter((h) => (counteredBy[h.name] ?? []).includes(name))
      .map((h) => h.name),
    laneWins: laneWins[name] ?? [],
    synergy: heroes
      .filter((h) => (synergyWith[h.name] ?? []).includes(name))
      .map((h) => h.name),
    items: itemsVs[name] ?? [],
  };
}

