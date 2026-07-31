/**
 * Counter-pick knowledge base.
 *
 * Three pipe-delimited tables, all keyed by hero display name:
 *  - COUNTERED_BY: heroes that beat the key hero, STRONGEST FIRST (order is
 *    meaningful: the engine weights earlier entries higher).
 *  - LANE_WINS: heroes the key hero beats in a straight lane matchup.
 *  - ITEMS_VS: items that specifically punish the key hero.
 */
const COUNTERED_BY = `
Abaddon|Ancient Apparition,Doom,Necrophos,Silencer,Nyx Assassin,Shadow Demon,Slark
Alchemist|Ancient Apparition,Viper,Necrophos,Bloodseeker,Nyx Assassin,Lifestealer
Ancient Apparition|Clockwork,Storm Spirit,Puck,Nyx Assassin,Weaver
Anti-Mage|Shadow Shaman,Bloodseeker,Legion Commander,Doom,Night Stalker,Meepo
Arc Warden|Night Stalker,Nyx Assassin,Broodmother,Bane,Ursa
Axe|Viper,Timbersaw,Bristleback,Razor,Death Prophet
Bane|Silencer,Storm Spirit,Puck,Nyx Assassin,Lycan
Batrider|Abaddon,Queen of Pain,Storm Spirit,Viper,Oracle
Beastmaster|Winter Wyvern,Sven,Leshrac,Kunkka,Earthshaker
Bloodseeker|Abaddon,Medusa,Oracle,Winter Wyvern,Anti-Mage
Bounty Hunter|Zeus,Slardar,Bristleback,Nature's Prophet,Oracle
Brewmaster|Leshrac,Sven,Earthshaker,Skywrath Mage,Outworld Destroyer
Bristleback|Silencer,Viper,Ursa,Doom,Nyx Assassin,Bane,Shadow Shaman,Disruptor
Broodmother|Axe,Timbersaw,Earthshaker,Grimstroke,Batrider
Centaur Warrunner|Lifestealer,Underlord,Viper,Ursa,Necrophos
Chaos Knight|Sand King,Earthshaker,Winter Wyvern,Leshrac,Axe
Chen|Enchantress,Clinkz,Axe,Legion Commander,Bloodseeker
Clinkz|Zeus,Slardar,Bounty Hunter,Spectre,Bane
Clockwork|Lifestealer,Juggernaut,Abaddon,Slark,Puck
Crystal Maiden|Riki,Nyx Assassin,Storm Spirit,Spirit Breaker,Clinkz,Rubick,Lifestealer
Dark Seer|Anti-Mage,Oracle,Bristleback,Timbersaw,Puck
Dark Willow|Silencer,Axe,Nyx Assassin,Storm Spirit,Slark
Dawnbreaker|Nyx Assassin,Lifestealer,Ancient Apparition,Viper,Necrophos
Dazzle|Ancient Apparition,Axe,Doom,Nyx Assassin,Necrophos
Death Prophet|Ancient Apparition,Bloodseeker,Pugna,Anti-Mage,Viper
Disruptor|Abaddon,Pangolier,Juggernaut,Slark,Storm Spirit
Doom|Oracle,Medusa,Abaddon,Lifestealer,Slark
Dragon Knight|Viper,Elder Titan,Timbersaw,Ursa,Bristleback
Drow Ranger|Clockwork,Spirit Breaker,Storm Spirit,Nyx Assassin,Mars,Riki,Spectre
Earth Spirit|Silencer,Ancient Apparition,Bristleback,Timbersaw,Storm Spirit,Oracle,Axe
Earthshaker|Silencer,Sniper,Storm Spirit,Nyx Assassin,Drow Ranger,Rubick,Lycan
Elder Titan|Silencer,Nyx Assassin,Puck,Slark,Storm Spirit,Winter Wyvern
Ember Spirit|Bloodseeker,Legion Commander,Ancient Apparition,Bane,Doom,Shadow Fiend
Enchantress|Timbersaw,Sven,Leshrac,Centaur Warrunner,Death Prophet,Winter Wyvern,Lycan
Enigma|Rubick,Storm Spirit,Nyx Assassin,Puck,Templar Assassin,Silencer
Faceless Void|Winter Wyvern,Shadow Demon,Oracle,Silencer,Rubick,Shadow Shaman,Bloodseeker
Grimstroke|Anti-Mage,Nyx Assassin,Storm Spirit,Slark,Silencer,Oracle,Spectre
Gyrocopter|Ancient Apparition,Nyx Assassin,Slark,Riki,Storm Spirit,Bane,Spectre
Hoodwink|Silencer,Nyx Assassin,Storm Spirit,Slark,Bristleback,Clockwork,Weaver
Huskar|Ancient Apparition,Necrophos,Viper,Pugna,Templar Assassin,Winter Wyvern,Oracle,Bloodseeker
Invoker|Nyx Assassin,Night Stalker,Storm Spirit,Riki,Templar Assassin,Bane,Broodmother
Io|Ancient Apparition,Doom,Necrophos,Pugna,Skywrath Mage,Oracle,Undying
Jakiro|Anti-Mage,Storm Spirit,Nyx Assassin,Slark,Riki,Silencer,Spectre
Juggernaut|Ancient Apparition,Axe,Necrophos,Viper,Bane,Rubick,Pugna
Keeper of the Light|Silencer,Nyx Assassin,Storm Spirit,Slark,Spirit Breaker,Bane
Kez|Axe,Bristleback,Viper,Timbersaw,Legion Commander,Clockwork,Broodmother
Kunkka|Anti-Mage,Storm Spirit,Puck,Silencer,Slark,Rubick,Weaver
Largo|Lion,Lina,Zeus,Ancient Apparition,Silencer
Legion Commander|Puck,Storm Spirit,Winter Wyvern,Shadow Demon,Ancient Apparition,Oracle,Axe,Bane
Leshrac|Nyx Assassin,Anti-Mage,Pugna,Storm Spirit,Bristleback,Rubick,Lifestealer
Lich|Anti-Mage,Storm Spirit,Nyx Assassin,Riki,Slark,Ancient Apparition,Axe
Lifestealer|Ancient Apparition,Necrophos,Viper,Timbersaw,Razor,Nyx Assassin,Slardar
Lina|Meepo,Nyx Assassin,Storm Spirit,Bristleback,Timbersaw,Abaddon,Pugna
Lion|Anti-Mage,Storm Spirit,Nyx Assassin,Bristleback,Riki,Abaddon,Spectre
Lone Druid|Axe,Legion Commander,Bristleback,Necrophos,Winter Wyvern,Silencer,Broodmother
Luna|Ancient Apparition,Nyx Assassin,Riki,Storm Spirit,Slark,Abaddon,Spectre
Lycan|Timbersaw,Necrophos,Bane,Leshrac,Winter Wyvern,Oracle,Axe
Magnus|Silencer,Anti-Mage,Storm Spirit,Sniper,Nyx Assassin,Winter Wyvern,Weaver
Marci|Silencer,Axe,Bristleback,Viper,Timbersaw,Ursa
Mars|Silencer,Anti-Mage,Storm Spirit,Necrophos,Viper,Abaddon,Lifestealer
Medusa|Anti-Mage,Doom,Nyx Assassin,Lion,Silencer,Ancient Apparition,Slark
Meepo|Axe,Sven,Earthshaker,Leshrac,Timbersaw,Kunkka,Bane,Sand King
Mirana|Sniper,Bristleback,Zeus,Slardar,Storm Spirit,Bane,Spectre
Monkey King|Ursa,Bristleback,Timbersaw,Axe,Winter Wyvern,Bane,Beastmaster
Morphling|Ancient Apparition,Nyx Assassin,Doom,Bane,Templar Assassin,Spectre
Muerta|Silencer,Nyx Assassin,Storm Spirit,Slark,Anti-Mage,Bane,Bloodseeker
Naga Siren|Timbersaw,Leshrac,Sand King,Earthshaker,Kunkka,Axe,Shadow Shaman,Luna
Nature's Prophet|Bristleback,Timbersaw,Axe,Ursa,Spectre,Bane
Necrophos|Ancient Apparition,Anti-Mage,Silencer,Nyx Assassin,Bristleback,Abaddon,Pugna
Night Stalker|Silencer,Viper,Necrophos,Bristleback,Timbersaw,Bane,Undying
Nyx Assassin|Bristleback,Timbersaw,Zeus,Slardar,Necrophos,Abaddon,Windranger
Ogre Magi|Anti-Mage,Storm Spirit,Silencer,Necrophos,Slark,Bane,Weaver
Omniknight|Ancient Apparition,Doom,Necrophos,Nyx Assassin,Pugna,Oracle,Medusa
Oracle|Ancient Apparition,Nyx Assassin,Silencer,Storm Spirit,Slark,Clockwork,Spectre
Outworld Destroyer|Nyx Assassin,Anti-Mage,Silencer,Puck,Storm Spirit,Spectre
Pangolier|Silencer,Bane,Axe,Viper,Bristleback,Winter Wyvern,Shadow Fiend
Phantom Assassin|Bristleback,Timbersaw,Axe,Viper,Earthshaker,Mars,Shadow Shaman,Slardar,Pugna,Lion,Shadow Demon
Phantom Lancer|Axe,Leshrac,Sand King,Earthshaker,Timbersaw,Kunkka,Rubick,Lifestealer
Phoenix|Ancient Apparition,Silencer,Anti-Mage,Storm Spirit,Nyx Assassin,Axe
Primal Beast|Viper,Necrophos,Timbersaw,Silencer,Bristleback,Ogre Magi,Ursa
Puck|Bloodseeker,Legion Commander,Bane,Doom,Night Stalker,Broodmother
Pudge|Anti-Mage,Storm Spirit,Necrophos,Viper,Puck,Silencer,Axe
Pugna|Anti-Mage,Nyx Assassin,Storm Spirit,Silencer,Slark,Bane,Spectre
Queen of Pain|Bloodseeker,Silencer,Legion Commander,Bane,Nyx Assassin,Spectre
Razor|Anti-Mage,Storm Spirit,Nyx Assassin,Timbersaw,Silencer,Winter Wyvern,Lifestealer
Riki|Zeus,Slardar,Bounty Hunter,Bristleback,Necrophos,Bane,Spectre
Ringmaster|Silencer,Nyx Assassin,Anti-Mage,Storm Spirit,Slark,Clockwork,Ursa
Rubick|Nyx Assassin,Silencer,Storm Spirit,Slark,Riki,Bane,Broodmother
Sand King|Weaver,Clockwork,Spectre,Lifestealer,Zeus,Enchantress,Medusa,Anti-Mage
Shadow Demon|Anti-Mage,Nyx Assassin,Storm Spirit,Slark,Silencer,Rubick
Shadow Fiend|Storm Spirit,Puck,Queen of Pain,Nyx Assassin,Void Spirit,Bane,Spectre
Shadow Shaman|Anti-Mage,Storm Spirit,Nyx Assassin,Slark,Riki,Abaddon,Axe
Silencer|Anti-Mage,Storm Spirit,Nyx Assassin,Slark,Bristleback,Rubick,Spectre
Skywrath Mage|Anti-Mage,Storm Spirit,Nyx Assassin,Riki,Bristleback,Abaddon,Pugna
Slardar|Viper,Necrophos,Silencer,Bristleback,Timbersaw,Winter Wyvern,Spectre
Slark|Bloodseeker,Bounty Hunter,Zeus,Ancient Apparition,Necrophos,Slardar,Bane
Snapfire|Anti-Mage,Storm Spirit,Nyx Assassin,Silencer,Slark,Clockwork,Weaver
Sniper|Clockwork,Spirit Breaker,Storm Spirit,Nyx Assassin,Riki,Underlord,Spectre,Phantom Assassin,Mirana
Spectre|Clinkz,Weaver,Bloodseeker,Terrorblade,Broodmother,Viper,Shadow Shaman,Underlord,Abaddon
Spirit Breaker|Puck,Storm Spirit,Medusa,Windranger,Oracle,Bane
Storm Spirit|Ancient Apparition,Anti-Mage,Silencer,Bloodseeker,Doom,Bane,Spectre
Sven|Winter Wyvern,Lich,Jakiro,Timbersaw,Viper,Bane,Spectre
Techies|Zeus,Bristleback,Necrophos,Nature's Prophet,Slark,Abaddon,Spectre
Templar Assassin|Zeus,Bristleback,Timbersaw,Razor,Necrophos,Bane,Slardar
Terrorblade|Timbersaw,Leshrac,Sand King,Earthshaker,Shadow Demon,Oracle,Bane,Spectre
Tidehunter|Silencer,Anti-Mage,Storm Spirit,Necrophos,Viper,Oracle,Medusa
Timbersaw|Meepo,Lycan,Broodmother,Ursa,Chaos Knight,Silencer,Viper,Bane,Shadow Shaman,Disruptor
Tinker|Storm Spirit,Anti-Mage,Nyx Assassin,Night Stalker,Zeus,Clockwork,Spectre
Tiny|Anti-Mage,Storm Spirit,Silencer,Bristleback,Necrophos,Rubick,Weaver
Treant Protector|Anti-Mage,Storm Spirit,Nyx Assassin,Silencer,Slark,Winter Wyvern
Troll Warlord|Bristleback,Timbersaw,Axe,Viper,Razor,Rubick,Slardar
Tusk|Silencer,Anti-Mage,Storm Spirit,Bristleback,Necrophos,Bane,Spectre
Underlord|Viper,Timbersaw,Anti-Mage,Silencer,Necrophos,Oracle,Medusa
Undying|Viper,Razor,Sniper,Drow Ranger,Anti-Mage,Oracle,Medusa
Ursa|Bane,Winter Wyvern,Lich,Crystal Maiden,Shadow Demon,Viper,Windranger
Vengeful Spirit|Anti-Mage,Storm Spirit,Nyx Assassin,Silencer,Slark,Bane,Spectre
Venomancer|Anti-Mage,Storm Spirit,Abaddon,Juggernaut,Slark,Pugna
Viper|Nyx Assassin,Storm Spirit,Anti-Mage,Puck,Lion,Abaddon,Lifestealer
Visage|Sven,Leshrac,Earthshaker,Kunkka,Timbersaw,Winter Wyvern,Weaver
Void Spirit|Silencer,Bloodseeker,Legion Commander,Bane,Ancient Apparition,Broodmother
Warlock|Anti-Mage,Nyx Assassin,Storm Spirit,Silencer,Slark,Abaddon,Bloodseeker
Weaver|Zeus,Bounty Hunter,Slardar,Bristleback,Ancient Apparition,Bane,Bloodseeker
Windranger|Anti-Mage,Storm Spirit,Nyx Assassin,Silencer,Bristleback,Clockwork,Spectre
Winter Wyvern|Anti-Mage,Storm Spirit,Nyx Assassin,Silencer,Ancient Apparition,Abaddon,Medusa
Witch Doctor|Anti-Mage,Storm Spirit,Nyx Assassin,Ancient Apparition,Slark,Clockwork,Spectre
Wraith King|Anti-Mage,Doom,Necrophos,Viper,Ancient Apparition,Abaddon,Axe
Zeus|Anti-Mage,Nyx Assassin,Storm Spirit,Riki,Clockwork,Ancient Apparition,Spectre
`;

const LANE_WINS = `
Alchemist|Meepo
Axe|Meepo,Broodmother,Phantom Lancer
Bane|Broodmother,Timbersaw
Batrider|Meepo,Broodmother,Timbersaw
Bristleback|Meepo,Sven
Broodmother|Anti-Mage,Spectre,Naga Siren
Clinkz|Timbersaw
Crystal Maiden|Ursa,Monkey King
Dark Seer|Meepo,Sven,Chaos Knight
Doom|Timbersaw,Bristleback,Alchemist
Drow Ranger|Timbersaw
Earth Spirit|Shadow Fiend
Ember Spirit|Shadow Fiend
Enchantress|Timbersaw,Centaur Warrunner
Grimstroke|Sven,Chaos Knight
Gyrocopter|Phantom Lancer,Naga Siren
Huskar|Meepo,Timbersaw
Invoker|Meepo
Jakiro|Sven,Chaos Knight
Keeper of the Light|Timbersaw,Bristleback
Leshrac|Meepo
Lich|Sven,Ursa
Lina|Meepo
Luna|Meepo
Mars|Sniper,Drow Ranger
Naga Siren|Timbersaw
Nature's Prophet|Sven,Chaos Knight
Necrophos|Axe,Bristleback,Timbersaw
Oracle|Terrorblade
Phantom Assassin|Timbersaw
Phantom Lancer|Timbersaw
Puck|Shadow Fiend,Invoker
Queen of Pain|Shadow Fiend
Razor|Meepo,Timbersaw,Bristleback,Dragon Knight
Rubick|Timbersaw
Sand King|Sniper,Luna
Shadow Demon|Terrorblade
Shadow Fiend|Tinker
Slardar|Spectre,Phantom Assassin
Snapfire|Sven,Ursa
Storm Spirit|Shadow Fiend,Invoker
Sven|Meepo
Techies|Meepo
Terrorblade|Timbersaw
Tidehunter|Phantom Assassin,Ursa
Timbersaw|Meepo,Lycan,Broodmother
Tinker|Meepo
Underlord|Sniper,Drow Ranger
Ursa|Axe,Timbersaw,Centaur Warrunner,Mars,Primal Beast
Viper|Meepo,Timbersaw,Bristleback,Alchemist
Void Spirit|Shadow Fiend
Winter Wyvern|Sven,Luna
Zeus|Tinker
`;

const ITEMS_VS = `
Abaddon|Spirit Vessel,Shiva's Guard,Silver Edge,Nullifier
Alchemist|Spirit Vessel,Eye of Skadi,Heaven's Halberd,Desolator
Ancient Apparition|Black King Bar,Pipe of Insight,Blink Dagger,Eul's Scepter of Divinity
Anti-Mage|Orchid Malevolence,Scythe of Vyse,Bloodthorn,Battle Fury,Rod of Atos,Diffusal Blade
Arc Warden|Battle Fury,Mjollnir,Silver Edge,Gleipnir
Axe|Ghost Scepter,Hurricane Pike,Linken's Sphere,Force Staff
Bane|Linken's Sphere,Manta Style,Black King Bar,Lotus Orb,Eul's Scepter of Divinity
Batrider|Linken's Sphere,Lotus Orb,Black King Bar,Force Staff
Beastmaster|Crimson Guard,Radiance,Battle Fury,Linken's Sphere
Bloodseeker|Eul's Scepter of Divinity,Ghost Scepter,Heaven's Halberd,Spirit Vessel
Bounty Hunter|Sentry Ward,Dust of Appearance,Gem of True Sight,Solar Crest
Brewmaster|Radiance,Battle Fury,Black King Bar,Shiva's Guard,Monkey King Bar
Bristleback|Silver Edge,Spirit Vessel,Ethereal Blade,Revenant's Brooch
Broodmother|Crimson Guard,Battle Fury,Radiance,Sentry Ward
Centaur Warrunner|Silver Edge,Spirit Vessel,Heaven's Halberd,Blade Mail
Chaos Knight|Battle Fury,Mjollnir,Crimson Guard,Radiance
Chen|Battle Fury,Radiance,Maelstrom,Spirit Vessel
Clinkz|Sentry Ward,Dust of Appearance,Crimson Guard,Gem of True Sight
Clockwork|Linken's Sphere,Hurricane Pike,Black King Bar,Force Staff
Crystal Maiden|Black King Bar,Blink Dagger,Glimmer Cape,Force Staff,Eul's Scepter of Divinity,Blade Mail
Dark Seer|Battle Fury,Mjollnir,Black King Bar,Pipe of Insight
Dark Willow|Black King Bar,Manta Style,Linken's Sphere,Pipe of Insight
Dawnbreaker|Silver Edge,Spirit Vessel,Heaven's Halberd,Shiva's Guard
Dazzle|Spirit Vessel,Nullifier,Shiva's Guard,Silver Edge
Death Prophet|Black King Bar,Pipe of Insight,Spirit Vessel,Blade Mail
Disruptor|Black King Bar,Manta Style,Linken's Sphere,Aeon Disk
Doom|Linken's Sphere,Lotus Orb,Aeon Disk,Manta Style
Dragon Knight|Silver Edge,Heaven's Halberd,Spirit Vessel,Desolator
Drow Ranger|Heaven's Halberd,Blink Dagger,Crimson Guard,Satanic,Ghost Scepter
Earth Spirit|Black King Bar,Aeon Disk,Manta Style,Pipe of Insight
Earthshaker|Black King Bar,Aeon Disk,Manta Style,Force Staff
Elder Titan|Black King Bar,Pipe of Insight,Blink Dagger,Aeon Disk
Ember Spirit|Orchid Malevolence,Scythe of Vyse,Bloodthorn,Shiva's Guard
Enchantress|Battle Fury,Radiance,Blink Dagger,Maelstrom
Enigma|Black King Bar,Aeon Disk,Battle Fury,Eul's Scepter of Divinity
Faceless Void|Black King Bar,Aeon Disk,Ghost Scepter,Heaven's Halberd
Grimstroke|Black King Bar,Manta Style,Linken's Sphere,Aeon Disk
Gyrocopter|Heaven's Halberd,Blade Mail,Eye of Skadi,Pipe of Insight
Hoodwink|Black King Bar,Manta Style,Blink Dagger,Sentry Ward
Huskar|Spirit Vessel,Heaven's Halberd,Ghost Scepter,Shiva's Guard
Invoker|Black King Bar,Blink Dagger,Pipe of Insight,Aeon Disk,Manta Style
Io|Spirit Vessel,Nullifier,Shiva's Guard,Orchid Malevolence
Jakiro|Black King Bar,Pipe of Insight,Blink Dagger,Manta Style
Juggernaut|Spirit Vessel,Heaven's Halberd,Ghost Scepter,Eye of Skadi
Keeper of the Light|Black King Bar,Blink Dagger,Manta Style,Pipe of Insight
Kez|Heaven's Halberd,Ghost Scepter,Crimson Guard,Force Staff
Kunkka|Black King Bar,Aeon Disk,Manta Style,Linken's Sphere
Largo|Black King Bar,Nullifier,Spirit Vessel,Aeon Disk
Legion Commander|Linken's Sphere,Eul's Scepter of Divinity,Lotus Orb,Ghost Scepter,Wind Waker
Leshrac|Black King Bar,Pipe of Insight,Glimmer Cape,Blade Mail
Lich|Black King Bar,Pipe of Insight,Manta Style,Blink Dagger
Lifestealer|Eye of Skadi,Heaven's Halberd,Spirit Vessel,Shiva's Guard
Lina|Black King Bar,Blade Mail,Glimmer Cape,Aeon Disk,Pipe of Insight
Lion|Black King Bar,Linken's Sphere,Blade Mail,Aeon Disk
Lone Druid|Crimson Guard,Battle Fury,Radiance,Heaven's Halberd
Luna|Eye of Skadi,Heaven's Halberd,Pipe of Insight,Crimson Guard
Lycan|Crimson Guard,Radiance,Battle Fury,Heaven's Halberd
Magnus|Black King Bar,Aeon Disk,Manta Style,Linken's Sphere
Marci|Heaven's Halberd,Ghost Scepter,Force Staff,Crimson Guard
Mars|Black King Bar,Aeon Disk,Force Staff,Heaven's Halberd
Medusa|Diffusal Blade,Silver Edge,Desolator,Nullifier,Shiva's Guard
Meepo|Battle Fury,Radiance,Mjollnir,Overwhelming Blink
Mirana|Sentry Ward,Black King Bar,Manta Style,Dust of Appearance
Monkey King|Silver Edge,Mjollnir,Crimson Guard,Sentry Ward,Eye of Skadi
Morphling|Spirit Vessel,Nullifier,Diffusal Blade,Scythe of Vyse
Muerta|Heaven's Halberd,Black King Bar,Ghost Scepter,Eye of Skadi
Naga Siren|Battle Fury,Mjollnir,Radiance,Crimson Guard,Black King Bar
Nature's Prophet|Town Portal Scroll,Battle Fury,Radiance,Rod of Atos
Necrophos|Spirit Vessel,Nullifier,Aeon Disk,Black King Bar,Shiva's Guard,Blade Mail
Night Stalker|Ghost Scepter,Heaven's Halberd,Force Staff,Crimson Guard
Nyx Assassin|Sentry Ward,Black King Bar,Aeon Disk,Dust of Appearance
Ogre Magi|Black King Bar,Blade Mail,Pipe of Insight,Nullifier
Omniknight|Spirit Vessel,Nullifier,Shiva's Guard,Silver Edge
Oracle|Spirit Vessel,Nullifier,Shiva's Guard,Orchid Malevolence
Outworld Destroyer|Black King Bar,Manta Style,Pipe of Insight,Orchid Malevolence
Pangolier|Black King Bar,Ghost Scepter,Heaven's Halberd,Scythe of Vyse
Phantom Assassin|Monkey King Bar,Heaven's Halberd,Blade Mail,Ghost Scepter,Crimson Guard,Silver Edge,Bloodthorn,Solar Crest
Phantom Lancer|Battle Fury,Mjollnir,Radiance,Crimson Guard,Gleipnir
Phoenix|Black King Bar,Spirit Vessel,Pipe of Insight,Blink Dagger
Primal Beast|Black King Bar,Aeon Disk,Force Staff,Silver Edge
Puck|Orchid Malevolence,Scythe of Vyse,Rod of Atos,Bloodthorn,Manta Style
Pudge|Force Staff,Ghost Scepter,Blink Dagger,Linken's Sphere
Pugna|Black King Bar,Pipe of Insight,Blink Dagger,Manta Style
Queen of Pain|Orchid Malevolence,Black King Bar,Rod of Atos,Scythe of Vyse,Bloodthorn
Razor|Black King Bar,Heaven's Halberd,Force Staff,Pipe of Insight
Riki|Sentry Ward,Dust of Appearance,Gem of True Sight,Eul's Scepter of Divinity
Ringmaster|Black King Bar,Manta Style,Linken's Sphere,Aeon Disk
Rubick|Black King Bar,Manta Style,Linken's Sphere,Blink Dagger
Sand King|Sentry Ward,Black King Bar,Aeon Disk,Pipe of Insight
Shadow Demon|Manta Style,Black King Bar,Linken's Sphere,Battle Fury
Shadow Fiend|Ghost Scepter,Crimson Guard,Heaven's Halberd,Force Staff
Shadow Shaman|Black King Bar,Linken's Sphere,Manta Style,Blink Dagger
Silencer|Manta Style,Black King Bar,Eul's Scepter of Divinity,Guardian Greaves
Skywrath Mage|Black King Bar,Glimmer Cape,Pipe of Insight,Manta Style,Blade Mail
Slardar|Ghost Scepter,Force Staff,Heaven's Halberd,Linken's Sphere
Slark|Spirit Vessel,Sentry Ward,Heaven's Halberd,Eye of Skadi,Ghost Scepter,Orchid Malevolence
Snapfire|Black King Bar,Pipe of Insight,Manta Style,Aeon Disk
Sniper|Blink Dagger,Crimson Guard,Satanic,Heaven's Halberd,Ghost Scepter
Spectre|Silver Edge,Battle Fury,Heaven's Halberd,Mjollnir,Eye of Skadi
Spirit Breaker|Linken's Sphere,Hurricane Pike,Ghost Scepter,Force Staff
Storm Spirit|Orchid Malevolence,Scythe of Vyse,Diffusal Blade,Bloodthorn,Rod of Atos,Manta Style
Sven|Eye of Skadi,Heaven's Halberd,Shiva's Guard,Crimson Guard,Ghost Scepter,Abyssal Blade
Techies|Black King Bar,Aeon Disk,Pipe of Insight,Sentry Ward
Templar Assassin|Sentry Ward,Heaven's Halberd,Crimson Guard,Ghost Scepter,Solar Crest
Terrorblade|Battle Fury,Mjollnir,Radiance,Silver Edge,Crimson Guard
Tidehunter|Black King Bar,Aeon Disk,Silver Edge,Manta Style
Timbersaw|Silver Edge,Spirit Vessel,Rod of Atos,Revenant's Brooch
Tinker|Aeon Disk,Blink Dagger,Black King Bar,Rod of Atos
Tiny|Black King Bar,Aeon Disk,Ghost Scepter,Heaven's Halberd
Treant Protector|Sentry Ward,Black King Bar,Nullifier,Spirit Vessel
Troll Warlord|Monkey King Bar,Heaven's Halberd,Eye of Skadi,Shiva's Guard,Ghost Scepter,Abyssal Blade
Tusk|Black King Bar,Force Staff,Ghost Scepter,Linken's Sphere
Underlord|Black King Bar,Pipe of Insight,Silver Edge,Spirit Vessel
Undying|Spirit Vessel,Battle Fury,Silver Edge,Force Staff
Ursa|Eye of Skadi,Ghost Scepter,Heaven's Halberd,Shiva's Guard,Force Staff
Vengeful Spirit|Black King Bar,Linken's Sphere,Ghost Scepter,Force Staff
Venomancer|Black King Bar,Pipe of Insight,Battle Fury,Manta Style
Viper|Black King Bar,Pipe of Insight,Blink Dagger,Force Staff
Visage|Battle Fury,Radiance,Crimson Guard,Maelstrom
Void Spirit|Orchid Malevolence,Scythe of Vyse,Black King Bar,Rod of Atos
Warlock|Black King Bar,Battle Fury,Linken's Sphere,Spirit Vessel,Nullifier
Weaver|Sentry Ward,Dust of Appearance,Heaven's Halberd,Spirit Vessel,Orchid Malevolence
Windranger|Monkey King Bar,Black King Bar,Manta Style,Force Staff
Winter Wyvern|Black King Bar,Nullifier,Spirit Vessel,Manta Style
Witch Doctor|Black King Bar,Spirit Vessel,Pipe of Insight,Blink Dagger,Eul's Scepter of Divinity
Wraith King|Diffusal Blade,Battle Fury,Spirit Vessel,Silver Edge,Heaven's Halberd
Zeus|Black King Bar,Pipe of Insight,Glimmer Cape,Blade Mail,Aeon Disk
`;

/**
 * Supplementary table in the OPPOSITE direction: `hero|heroes it counters`.
 *
 * COUNTERED_BY alone left many heroes (Enigma, Faceless Void, Omniknight, …)
 * never appearing as anyone's counter, so they could never be suggested. These
 * relations are merged into COUNTERED_BY at the end of each list, so they are
 * treated as softer counters than the hand-ranked entries above.
 */
const ALSO_COUNTERS = `
Alchemist|Meepo,Broodmother,Phantom Lancer,Naga Siren,Terrorblade
Arc Warden|Sniper,Drow Ranger,Phantom Assassin,Ursa,Troll Warlord
Brewmaster|Legion Commander,Meepo,Phantom Lancer,Naga Siren,Broodmother
Chen|Broodmother,Meepo,Nature's Prophet,Anti-Mage,Spectre
Dark Seer|Anti-Mage,Phantom Assassin,Terrorblade,Juggernaut,Legion Commander
Dark Willow|Ursa,Slark,Legion Commander,Juggernaut,Riki
Dawnbreaker|Crystal Maiden,Sniper,Zeus,Broodmother,Meepo
Dazzle|Phantom Assassin,Legion Commander,Ursa,Slark,Bloodseeker
Dragon Knight|Broodmother,Meepo,Nature's Prophet,Phantom Lancer,Templar Assassin
Earth Spirit|Storm Spirit,Puck,Queen of Pain,Weaver,Crystal Maiden
Ember Spirit|Phantom Lancer,Naga Siren,Meepo,Terrorblade,Broodmother
Enigma|Phantom Lancer,Naga Siren,Terrorblade,Meepo,Broodmother,Lycan
Faceless Void|Enigma,Witch Doctor,Bane,Legion Commander,Crystal Maiden
Gyrocopter|Phantom Lancer,Naga Siren,Meepo,Broodmother,Terrorblade
Hoodwink|Ursa,Slark,Legion Commander,Juggernaut,Pudge
Huskar|Zeus,Lina,Leshrac,Skywrath Mage,Death Prophet
Invoker|Phantom Lancer,Naga Siren,Meepo,Broodmother,Nature's Prophet
Io|Ursa,Legion Commander,Bloodseeker,Phantom Assassin
Keeper of the Light|Ursa,Slark,Legion Commander,Broodmother,Meepo
Kez|Sniper,Crystal Maiden,Zeus
Largo|Crystal Maiden,Sniper,Drow Ranger
Lone Druid|Medusa,Spectre,Terrorblade,Anti-Mage
Magnus|Phantom Lancer,Naga Siren,Meepo,Broodmother,Terrorblade
Marci|Sniper,Drow Ranger,Crystal Maiden,Zeus,Shadow Fiend
Monkey King|Crystal Maiden,Sniper,Drow Ranger,Shadow Fiend
Morphling|Sniper,Drow Ranger,Templar Assassin,Clinkz
Muerta|Phantom Assassin,Ursa,Sniper,Juggernaut,Troll Warlord
Naga Siren|Enigma,Tidehunter,Magnus,Warlock,Legion Commander
Omniknight|Phantom Assassin,Ursa,Sniper,Drow Ranger,Troll Warlord,Juggernaut
Phantom Lancer|Legion Commander,Ursa,Doom,Riki,Bloodseeker
Phoenix|Phantom Lancer,Naga Siren,Meepo,Broodmother,Huskar
Primal Beast|Crystal Maiden,Zeus,Sniper,Enigma,Witch Doctor
Pudge|Crystal Maiden,Zeus,Sniper,Shadow Fiend,Witch Doctor
Ringmaster|Ursa,Slark,Legion Commander
Snapfire|Ursa,Slark,Legion Commander,Broodmother,Meepo
Techies|Meepo,Broodmother,Nature's Prophet,Chen,Lone Druid
Tidehunter|Phantom Lancer,Naga Siren,Meepo,Terrorblade,Broodmother
Tinker|Sniper,Crystal Maiden,Drow Ranger,Spectre,Medusa
Tiny|Crystal Maiden,Witch Doctor,Phantom Lancer,Naga Siren,Meepo
Treant Protector|Broodmother,Nature's Prophet,Death Prophet,Meepo,Riki
Troll Warlord|Sniper,Drow Ranger,Anti-Mage,Juggernaut,Ursa
Tusk|Crystal Maiden,Sniper,Zeus,Shadow Fiend,Witch Doctor
Vengeful Spirit|Enigma,Tidehunter,Faceless Void,Legion Commander,Anti-Mage
Venomancer|Riki,Bounty Hunter,Clinkz,Slark,Broodmother
Visage|Crystal Maiden,Sniper,Zeus,Nature's Prophet
Warlock|Phantom Lancer,Naga Siren,Meepo,Terrorblade,Broodmother
Witch Doctor|Bristleback,Pudge,Underlord,Broodmother
Wraith King|Legion Commander,Ursa,Bloodseeker,Riki
`;

function parseTable(raw: string): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const line of raw.trim().split('\n')) {
    const [key, list] = line.split('|');
    out[key] = list.split(',').filter(Boolean);
  }
  return out;
}

/** hero -> heroes that counter it (strongest first). */
export const counteredBy = parseTable(COUNTERED_BY);

// Fold the reverse-direction table in as lower-priority (appended) relations.
for (const [counter, victims] of Object.entries(parseTable(ALSO_COUNTERS))) {
  for (const victim of victims) {
    const list = (counteredBy[victim] ??= []);
    if (!list.includes(counter)) list.push(counter);
  }
}

/** hero -> heroes it beats in lane. */
export const laneWins = parseTable(LANE_WINS);

/** hero -> items that punish it. */
export const itemsVs = parseTable(ITEMS_VS);

/**
 * How strongly `counter` beats `hero`, based on its rank in the hero's
 * counter list. Returns 0 when there is no known relation.
 */
export function counterWeight(hero: string, counter: string): number {
  const index = counteredBy[hero]?.indexOf(counter) ?? -1;
  if (index === -1) return 0;
  if (index === 0) return 3;
  if (index < 3) return 2.5;
  return 2;
}

export const totalCounterPairs = Object.values(counteredBy).reduce(
  (sum, list) => sum + list.length,
  0
);


