import type { Hero, Role, Tag } from './types';

/**
 * The full Dota 2 roster (127 heroes).
 *
 * Compact pipe-delimited table: `name|cdnSlug|roles|tags|winRate`.
 * The slug is Valve's internal hero name — it is what the Steam CDN uses for
 * portraits (e.g. Wraith King -> skeleton_king, Zeus -> zuus), so do not
 * "normalise" it from the display name.
 */
const RAW = `
Abaddon|abaddon|offlane,support|tank,regen|51.5
Alchemist|alchemist|carry,mid|physical,tank,regen|46.9
Ancient Apparition|ancient_apparition|support|magic|51.0
Anti-Mage|antimage|carry|physical,mobile,illusion|49.5
Arc Warden|arc_warden|carry,mid|physical,summon,magic|50.0
Axe|axe|offlane|tank,disable|52.2
Bane|bane|support|magic,disable|50.3
Batrider|batrider|offlane,mid|magic,mobile,disable|43.2
Beastmaster|beastmaster|offlane|summon,physical|44.4
Bloodseeker|bloodseeker|carry,offlane|physical,regen|51.7
Bounty Hunter|bounty_hunter|support,roamer|invis,physical|51.8
Brewmaster|brewmaster|offlane|summon,tank,disable|50.8
Bristleback|bristleback|offlane|tank,regen|48.9
Broodmother|broodmother|offlane,mid|summon,physical|50.0
Centaur Warrunner|centaur|offlane|tank,disable|51.0
Chaos Knight|chaos_knight|carry|illusion,physical,disable|50.5
Chen|chen|support|summon,regen|45.1
Clinkz|clinkz|carry|physical,invis,summon|49.4
Clockwork|rattletrap|offlane,support|disable,tank|48.8
Crystal Maiden|crystal_maiden|support|magic,disable|51.5
Dark Seer|dark_seer|offlane|illusion,magic,tank|48.6
Dark Willow|dark_willow|support|magic,disable|47.8
Dawnbreaker|dawnbreaker|offlane,support|tank,regen,physical|51.7
Dazzle|dazzle|support|regen,magic|50.9
Death Prophet|death_prophet|mid,offlane|magic,summon,pusher|47.1
Disruptor|disruptor|support|magic,disable|49.8
Doom|doom_bringer|offlane|tank,disable,magic|46.4
Dragon Knight|dragon_knight|mid,offlane|tank,physical,pusher|49.1
Drow Ranger|drow_ranger|carry|physical|51.2
Earth Spirit|earth_spirit|support,roamer|magic,disable,mobile|50.2
Earthshaker|earthshaker|support,offlane|magic,disable|50.3
Elder Titan|elder_titan|support,offlane|magic,disable|50.0
Ember Spirit|ember_spirit|mid|mobile,physical,illusion|49.4
Enchantress|enchantress|support,offlane|summon,physical|47.8
Enigma|enigma|offlane,support|summon,disable,magic|49.8
Faceless Void|faceless_void|carry|physical,disable|49.5
Grimstroke|grimstroke|support|magic,disable|51.5
Gyrocopter|gyrocopter|carry|physical,magic|43.1
Hoodwink|hoodwink|support,mid|magic,mobile,disable|48.1
Huskar|huskar|offlane,mid|regen,physical,tank|44.9
Invoker|invoker|mid|magic,disable|51.0
Io|wisp|support|regen,mobile|50.8
Jakiro|jakiro|support|magic,pusher|47.6
Juggernaut|juggernaut|carry|physical,regen,mobile|51.6
Keeper of the Light|keeper_of_the_light|support|magic|50.7
Kez|kez|carry,mid|physical,mobile|44.8
Kunkka|kunkka|mid,offlane|magic,disable,physical|49.1
Largo|largo|support,offlane|disable,tank,magic|47.5
Legion Commander|legion_commander|offlane|physical,tank,disable|52.8
Leshrac|leshrac|mid,offlane|magic,pusher|52.0
Lich|lich|support|magic|52.1
Lifestealer|life_stealer|carry|physical,tank,regen|52.4
Lina|lina|mid,support|magic,burst|49.6
Lion|lion|support|magic,disable,burst|48.6
Lone Druid|lone_druid|carry,offlane|summon,physical,pusher|49.0
Luna|luna|carry|physical,magic|50.0
Lycan|lycan|carry,offlane|summon,physical,pusher|48.7
Magnus|magnataur|offlane,mid|disable,physical|48.4
Marci|marci|support,offlane,carry|physical,disable,mobile|49.5
Mars|mars|offlane|tank,disable,physical|46.4
Medusa|medusa|carry|physical,tank|49.7
Meepo|meepo|mid,carry|physical,summon|50.8
Mirana|mirana|support,carry,mid|magic,disable,invis|51.1
Monkey King|monkey_king|carry,mid|physical,mobile,illusion|44.3
Morphling|morphling|carry,mid|physical,mobile,tank|47.2
Muerta|muerta|carry,mid|physical,magic|46.4
Naga Siren|naga_siren|carry|illusion,disable,pusher|47.7
Nature's Prophet|furion|mid,offlane,support|summon,pusher,mobile|42.8
Necrophos|necrolyte|mid,offlane|magic,regen,tank|52.2
Night Stalker|night_stalker|offlane,roamer|physical,tank,disable|52.6
Nyx Assassin|nyx_assassin|support,roamer|magic,burst,invis|51.9
Ogre Magi|ogre_magi|support|magic,tank,disable|50.8
Omniknight|omniknight|support,offlane|regen,tank|50.1
Oracle|oracle|support|regen,magic|49.5
Outworld Destroyer|obsidian_destroyer|mid|magic,disable|49.6
Pangolier|pangolier|mid,offlane,carry|mobile,physical,disable|45.5
Phantom Assassin|phantom_assassin|carry|physical,mobile|50.9
Phantom Lancer|phantom_lancer|carry|illusion,physical|51.9
Phoenix|phoenix|offlane,support|magic,tank|50.8
Primal Beast|primal_beast|offlane|tank,disable,magic|48.3
Puck|puck|mid|magic,mobile,disable|47.0
Pudge|pudge|offlane,support|tank,disable,magic|51.3
Pugna|pugna|mid,support|magic,pusher|49.7
Queen of Pain|queenofpain|mid|magic,mobile,burst|46.4
Razor|razor|mid,carry,offlane|physical,magic|49.9
Riki|riki|carry,roamer|invis,physical,disable|51.9
Ringmaster|ringmaster|support|magic,disable|47.6
Rubick|rubick|support|magic,disable|49.1
Sand King|sand_king|offlane,support|magic,disable,invis|48.4
Shadow Demon|shadow_demon|support|magic,illusion,disable|44.8
Shadow Fiend|nevermore|mid,carry|physical,magic|48.4
Shadow Shaman|shadow_shaman|support|magic,disable,pusher|51.8
Silencer|silencer|support,mid|magic,silence|51.0
Skywrath Mage|skywrath_mage|support,mid|magic,burst|50.1
Slardar|slardar|offlane,roamer|physical,disable,tank|50.0
Slark|slark|carry|physical,mobile,invis|49.3
Snapfire|snapfire|support,offlane|magic,disable|53.4
Sniper|sniper|carry,mid|physical|49.8
Spectre|spectre|carry|physical,illusion,tank|54.0
Spirit Breaker|spirit_breaker|offlane,roamer|physical,disable,tank|51.9
Storm Spirit|storm_spirit|mid|magic,mobile|46.8
Sven|sven|carry|physical,disable,tank|50.3
Techies|techies|support,mid|magic,burst|50.5
Templar Assassin|templar_assassin|mid,carry|physical,invis|45.9
Terrorblade|terrorblade|carry|illusion,physical|47.0
Tidehunter|tidehunter|offlane|tank,disable|50.1
Timbersaw|shredder|offlane,mid|tank,magic,mobile|44.6
Tinker|tinker|mid|magic,burst,mobile|46.8
Tiny|tiny|mid,offlane,carry|physical,disable,burst|44.7
Treant Protector|treant|support|regen,disable,invis|50.8
Troll Warlord|troll_warlord|carry|physical|50.4
Tusk|tusk|support,roamer,offlane|disable,physical|47.5
Underlord|abyssal_underlord|offlane|tank,magic|50.0
Undying|undying|support,offlane|tank,regen,summon|52.4
Ursa|ursa|carry,offlane|physical|47.2
Vengeful Spirit|vengefulspirit|support|physical,disable|53.1
Venomancer|venomancer|support,offlane|magic,summon|47.0
Viper|viper|mid,offlane,carry|magic,physical,tank|48.3
Visage|visage|support,mid,offlane|summon,physical,magic|52.4
Void Spirit|void_spirit|mid|magic,mobile,burst|49.1
Warlock|warlock|support|magic,summon,regen|49.1
Weaver|weaver|carry,support|physical,invis,mobile|47.2
Windranger|windrunner|mid,support,offlane|magic,physical,disable|48.2
Winter Wyvern|winter_wyvern|support|magic,regen,disable|49.1
Witch Doctor|witch_doctor|support|magic,regen|51.8
Wraith King|skeleton_king|carry,offlane|physical,tank,summon|54.5
Zeus|zuus|mid,support|magic,burst|51.6
`;

export const heroes: Hero[] = RAW.trim()
  .split('\n')
  .map((line) => {
    const [name, slug, roles, tags, winRate] = line.split('|');
    return {
      name,
      slug,
      roles: roles.split(',').filter(Boolean) as Role[],
      tags: tags.split(',').filter(Boolean) as Tag[],
      winRate: Number(winRate),
    };
  });

export const heroNames: string[] = heroes.map((h) => h.name);

export const heroByName: Record<string, Hero> = Object.fromEntries(
  heroes.map((h) => [h.name, h])
);

export function heroPortrait(hero: Hero | string, size: 'sm' | 'lg' = 'sm') {
  const slug = typeof hero === 'string' ? heroByName[hero]?.slug : hero.slug;
  if (!slug) return '';
  return size === 'lg'
    ? `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${slug}.png`
    : `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/crops/${slug}.png`;
}

