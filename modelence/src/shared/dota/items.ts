import type { Item, ItemCategory, Tag } from './types';

/**
 * Counter-item catalogue.
 *
 * Compact pipe-delimited table: `name|cdnSlug|description|category|counters`.
 * `counters` lists the enemy archetype tags this item punishes — the draft
 * engine uses it to build item suggestions against a lineup, so keep the tags
 * honest (an item that solves nothing should have an empty tag list).
 *
 * Slugs are Valve internal item names (Skull Basher -> basher,
 * Crystalys -> lesser_crit, Dust of Appearance -> dust).
 */
const RAW = `
Black King Bar|black_king_bar|Magic immunity blanks spells, stuns and channels for 5-9s.|defense|magic,disable,burst
Pipe of Insight|pipe|Team-wide magic barrier plus magic resistance aura.|defense|magic,burst
Glimmer Cape|glimmer_cape|Magic resistance and a fade to save a focused ally.|defense|magic,burst
Eternal Shroud|eternal_shroud|Magic resistance that turns incoming spell damage into mana.|defense|magic
Lotus Orb|lotus_orb|Reflects targeted spells back at the caster and dispels.|defense|disable,magic
Linken's Sphere|sphere|Blocks one single-target spell every 13 seconds.|defense|disable,magic
Aeon Disk|aeon_disk|Stasis when you drop low - survives full burst combos.|defense|burst,disable
Ghost Scepter|ghost|Ethereal form makes you immune to all attacks.|defense|physical
Blade Mail|blade_mail|Returns damage to whoever focuses you.|defense|burst,physical
Crimson Guard|crimson_guard|Team-wide physical damage block versus fast attackers.|defense|physical,summon,illusion
Heart of Tarrasque|heart|Massive HP pool and regeneration to survive burst.|defense|burst,magic
Wraith Pact|wraith_pact|Team-wide damage reduction aura in fights.|defense|physical,magic
Pavise|pavise|Barrier that soaks incoming damage on a squishy ally.|defense|burst
Guardian Greaves|guardian_greaves|Team heal plus dispel in the middle of a fight.|defense|magic,burst
Holy Locket|holy_locket|Amplifies all healing and gives a burst heal.|defense|burst
Sange and Yasha|sange_and_yasha|Status resistance shortens every stun on you.|defense|disable
Kaya and Sange|kaya_and_sange|Spell amp with status resistance for casters.|defense|disable
Yasha and Kaya|yasha_and_kaya|Movement, spell amp and status resistance.|defense|disable
Assault Cuirass|assault|Armor and attack speed aura for the whole team.|defense|physical
Shiva's Guard|shivas_guard|Armor, attack-speed slow aura and healing reduction.|defense|physical,regen
Vladmir's Offering|vladmir|Lifesteal, armor and magic resistance aura.|defense|physical
Heaven's Halberd|heavens_halberd|Disarms a right-clicker for up to 5 seconds.|offense|physical,tank
Monkey King Bar|monkey_king_bar|True strike and bonus damage against evasion.|offense|physical,mobile
Revenant's Brooch|revenants_brooch|Attacks become spell damage - ignores evasion and armor.|offense|physical,tank
Silver Edge|silver_edge|Break shuts off passive abilities on hit.|offense|tank,physical,regen
Nullifier|nullifier|Dispels buffs, mutes items and slows hard.|offense|regen,mobile,illusion
Diffusal Blade|diffusal_blade|Mana burn plus a reliable single-target slow.|offense|magic,mobile
Disperser|disperser|Dispels and slows straight through status resistance.|offense|regen,disable,tank
Orchid Malevolence|orchid|Silence that locks down mobile casters.|offense|mobile,magic
Bloodthorn|bloodthorn|Silence, true strike and crit amplification.|offense|mobile,magic,physical
Scythe of Vyse|sheepstick|Hex - the most reliable disable in the game.|offense|mobile,magic
Abyssal Blade|abyssal_blade|BKB-piercing bash to lock a slippery core down.|offense|mobile,physical
Skull Basher|basher|Bash chance gives melee heroes real lockdown.|offense|mobile
Rod of Atos|rod_of_atos|Long-range root for catching escape artists.|offense|mobile
Gleipnir|gungir|AoE root plus chain lightning versus illusions.|offense|mobile,illusion
Eul's Scepter of Divinity|cyclone|Cyclone for dispel, setup and interrupting channels.|offense|mobile,disable
Wind Waker|wind_waker|Cyclone save that dispels and repositions allies.|offense|disable,burst
Harpoon|harpoon|Pulls you onto a fleeing mobile hero.|offense|mobile
Hurricane Pike|hurricane_pike|Pushes melee initiators off you and adds range.|offense|physical,mobile
Force Staff|force_staff|Instant repositioning against initiators and combos.|offense|disable,mobile
Blink Dagger|blink|Instant gap-close onto backline casters.|offense|magic,burst
Overwhelming Blink|overwhelming_blink|Blink with an AoE slow that hurts illusions.|offense|illusion,summon
Spirit Vessel|spirit_vessel|Halves healing and regeneration on the target.|offense|regen,tank
Eye of Skadi|skadi|Slow, healing reduction and a huge stat block.|offense|regen,physical,mobile
Satanic|satanic|Unholy lifesteal to out-sustain right-clickers.|offense|physical
Butterfly|butterfly|Evasion and attack speed against physical cores.|offense|physical
Mjollnir|mjollnir|Static charge punishes illusions and melee attackers.|offense|illusion,physical
Battle Fury|bfury|Cleave shreds illusions and summoned units.|offense|illusion,summon
Radiance|radiance|Burn damage melts illusions, summons and pushers.|offense|illusion,summon,pusher
Maelstrom|maelstrom|Chain lightning clears illusion armies fast.|offense|illusion,summon
Crystalys|lesser_crit|Cheap crit to punish squishy cores early.|offense|physical
Daedalus|greater_crit|Crit damage to burst through tanky lineups.|offense|tank
Desolator|desolator|Minus armor to break through durable heroes.|offense|tank
Medallion of Courage|medallion_of_courage|Armor reduction that enables early kills.|offense|tank
Solar Crest|solar_crest|Armor swing plus evasion for duels.|offense|tank,physical
Veil of Discord|veil_of_discord|Magic amplification for spell-heavy lineups.|offense|tank
Ethereal Blade|ethereal_blade|Ethereal target takes amplified magic damage.|offense|physical,tank
Dagon|dagon_5|Instant burst to delete a squishy support.|offense|burst
Bloodstone|bloodstone|Spell lifesteal sustain for magic-damage cores.|offense|magic
Meteor Hammer|meteor_hammer|Channelled AoE stun for pushes and setup.|offense|pusher,summon
Refresher Orb|refresher|Resets ultimates for a second round of disables.|utility|tank,disable
Octarine Core|octarine_core|Cooldown reduction and spell lifesteal.|utility|magic
Aether Lens|aether_lens|Cast range so you never walk into the fight.|utility|physical
Aghanim's Scepter|ultimate_scepter|Ultimate upgrade - frequently a hard counter tool.|utility|
Aghanim's Shard|aghanims_shard|Hero-specific upgrade, many are pure counterplay.|utility|
Boots of Bearing|boots_of_bearing|Team movement and attack speed burst in fights.|utility|pusher
Town Portal Scroll|tpscroll|The real answer to split pushers and tower dives.|utility|pusher
Manta Style|manta|Dispels silences, roots and most debuffs on cast.|utility|silence,magic,disable
Dust of Appearance|dust|Reveals invisible heroes in a large radius.|vision|invis
Gem of True Sight|gem|Permanent true sight for hunting invisibility.|vision|invis
Sentry Ward|ward_sentry|Cheap true sight to deny invisibility and wards.|vision|invis,pusher
Smoke of Deceit|smoke_of_deceit|Move unseen to punish greedy split pushers.|vision|pusher
Observer Ward|ward_observer|Vision to dodge ganks and track rotations.|vision|mobile,invis
`;

export const items: Item[] = RAW.trim()
  .split('\n')
  .map((line) => {
    const [name, slug, description, category, counters] = line.split('|');
    return {
      name,
      slug,
      description,
      category: category as ItemCategory,
      counters: (counters ?? '').split(',').filter(Boolean) as Tag[],
    };
  });

export const itemByName: Record<string, Item> = Object.fromEntries(
  items.map((i) => [i.name, i])
);

export function itemIcon(item: Item | string) {
  const slug = typeof item === 'string' ? itemByName[item]?.slug : item.slug;
  if (!slug) return '';
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/${slug}.png`;
}

