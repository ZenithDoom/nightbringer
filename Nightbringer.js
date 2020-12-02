/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/
/*	-INFORMATION-
*/
var iFileName = "Nightbringer.js";
RequiredSheetVersion(12.999);
SourceList["HB:NB"] = {
	name: "Homebrew: Nightbringer",
	abbreviation: "HB:NB",
	group: "Homebrew",
};

ClassList.nightbringer = {
	regExpSearch: /nightbringer/i,
	name: "Nightbringer",
	source: ["HB:NB", 0],
	primaryAbility: "\n \u2022 Nightbringer: Dexterity and Charisma;",
	prereqs: "\n \u2022 Nightbringer: Dexterity 13 and Charisma 15;",
	die: 10,
	improvements: [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves: ["Dex", "Cha"],
	skills: ["\n\n" + toUni("Nightbringer") + ": Choose three from Acrobatics, Athletics, Deception, Intimidation, Performance, Persuasion, Religion and Stealth."],
	toolProfs: {
		primary: ["Playing Cards"],
		secondary: ["One musical instrument"]
	},
	armor: [
		[false, false, false, false],
		[false, false, false, false]
	],
	weapons: [
		[true, false, ["Flails"], ["glaive"], ["greataxe"], ["greatsword"], ["halberd"], ["longsword"], ["morningstar"], ["pike"], ["war pick"], ["warhammer"]],
		[true, false, ["Flails"], ["glaive"], ["greataxe"], ["greatsword"], ["halberd"], ["longsword"], ["morningstar"], ["pike"], ["war pick"], ["warhammer"]]
	],
	equipment: "Nightbringer starting equipment:\n \u2022 a longsword -or- a greatsword -or- a greataxe;\n \u2022 one musical instrument. \nAlternatively, choose 5d6 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses: ["Chaos Engine", ["nightbringer-rage engine", "nightbringer-shadow engine"]],
	attacks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2],
	spellcastingFactor: 2,
	spellcastingFactorRoundupMulti: true,
	spellcastingTable: [[0, 0, 0, 0, 0, 0, 0, 0, 0]].concat(levels.map(function (n) {
		return defaultSpellTable[Math.ceil(n / 2)];
	})),
	spellcastingKnown: { //Optional; Denotes the amount and type of spells the class has access to
		prepared: true, //Optional; This indicates that the class has to prepare spells like a cleric/druid/paladin/wizard
	},
	features: {
		"night arts": {
			name: "Night Arts",
			source: ["HB:NB", 3],
			minlevel: 1,
			description: desc([
				"Your practice of striking with the night gives you mastery of combat styles that use certain arms known as night weapons.",
				"These weapons are flails, glaives, greatswords, halberds, longswords, morningstars, pikes, war picks, warhammers, and greataxes.",
				"While you are wielding only night weapons and you aren't wearing armor, you can use Dexterity instead of Strength for the attack and damage rolls of your unarmed strikes and night weapons."
			]),
			calcChanges: {
				atkAdd: [
					function (fields, v) {
						if (classes.known.nightbringer && classes.known.nightbringer.level && (v.theWea.nightweapon || v.baseWeaponName == "flail" || v.baseWeaponName == "glaive" || v.baseWeaponName == "greataxe" || v.baseWeaponName == "greatsword" || v.baseWeaponName == "halberd" || v.baseWeaponName == "longsword" || v.baseWeaponName == "morningstar" || v.baseWeaponName == "pike" || v.baseWeaponName == "war pick" || v.baseWeaponName == "warhammer" || (v.isMeleeWeapon && (/simple/i).test(v.theWea.type)))) {
							if (fields.Mod == 1 || fields.Mod == 2 || What(AbilityScores.abbreviations[fields.Mod - 1] + " Mod") < What(AbilityScores.abbreviations[v.StrDex - 1] + " Mod")) {
								fields.Mod = v.StrDex;
							}
						};
					},
				]
			},
		},
		"dark senses": {
			name: "Dark Senses",
			source: ["HB:NB", 3],
			minlevel: 1,
			description: desc([
				"You feel and move with the chaos in the world around you.",
				"Armor is a nuisance that hampers that purity. starting 1st",
				"level, while unarmored, you cannot be surprised. Your senses",
				"are also sharpened to better protect yourself through reflex",
				"rather than armor. Your unarmored Armor Class is equal to",
				"11 + your Dexterity modifier."
			]),
			armorOptions: {
				regExpSearch: /justToAddToDropDown/,
				name: "Dark Senses",
				ac: 11,
				addMod: true
			},
			armorAdd: "Dark Senses"
		},
		"nox chao": {
			description: "\n   " + "I can spend chaos energy to fuel special actions (see third page)" + "\n   " + "At the end of a short rest i recall all chaos energy spent into myself",
			usages: ["", 5, 5, 5, 10, 10, 15, 15, 20, 20, 25, 25, 30, 30, 35, 35, 40, 40, 45, 45, 50],
			recovery: "short rest",
			"dark sinchronicity": {
				name: "Dark Sinchronicity",
				description: desc([
					"You can spend one chaos energy to make your next Dexterity",
					"ability check with advantage. If you are in darkness, you can",
					"make the check with a bonus action."
				])
			},
			"shadow step": {
				name: "Shadow Step",
				description: " [1 chaos energy point]" + "\n   " + "As a bonus action, I can Dash.",
				action: ["bonus action", ""]
			},
			autoSelectExtrachoices: [{
				extrachoice : "Dark Synchronicity",
				extraname : "Nox Chao Feature",
				extrachoice : "Shadow Step",
				extraname: "Nox Chao Feature",
			}]
		},
		"spellcasting": {
			name: "Spellcasting",
			source: [["HB:NB", 2]],
			minlevel: 2,
			description: desc([
				"I can cast prepared spells, using Charisma as my spellcasting ability",
				"To cast, I must use oe musical instrument I'm proficient with as a spellcasting focus"
			]),
			calcChanges: {
				spellAdd: [
					function (spellKey, spellObj, spName) {
						if (!spellObj.psionic && spName == "nightbringer" && spellObj.compMaterial === SpellsList[spellKey].compMaterial) {
							spellObj.compMaterial = (spellObj.compMaterial ? spellObj.compMaterial + ".\n\nAlso a" : "A") + "lways requires my artificer spellcasting focus: one musical instrument I'm proficient with.";
							if (GetFeatureChoice("classes", "nightbringer", "spellcasting", true).indexOf("don't change component column on spell sheet") != -1) {
								// do nothing if set to do so
							} else if (!spellObj.components) {
								spellObj.components = "M\u0192";
							} else if (spellObj.components.indexOf("M") == -1) {
								spellObj.components += ",M\u0192";
							} else if ((/M([^\u0192\u2020]|$)/).test(spellObj.components)) {
								spellObj.components = spellObj.components.replace("M", "M\u0192");
							}
							return true;
						}
						return false;
					},
					"My nightbringer spells always require me to use a spellcasting focus: one musical instrument I'm proficient with."
				]
			},
		},
		"subclassfeature3": {
			name: "Chaos Engine",
			minlevel: 3,
			description: "\n   " + "Choose a Chaos Engine to commit to and put it in the \"Class\" field on page 1" + "\n   " + "Choose either Rage Engine or Shadow Engine"
		},
		"night wings": {
			name: "Night Wings",
			source: ["HB:NB", 3],
			minlevel: 6,
			description: desc([
				"you can shape the darkness around you to give yourself height and lift, making the terrifying image of a dark angel.",
				"You can spend 5 chaos energy to make wings of darkness appear on yourself with no action necessary, giving you a flying speed of 60 feet.",
				"You can dispel these wings without any action."
			])
		},
		"improved dark senses": {
			name: "Improved Dark Senses",
			source: ["HB:NB", 3],
			minlevel: 6,
			description: desc([
				"your senses sharpen beyond battle and allow you to better sense other beings and see beyond",
				"darkness.While unarmored, you have advantage in all Wisdom(Insight) and(Perception) checks.You also gain 120",
				"feet of darkvision, and you can see in both magical and nonmagical darkness."
			])
		},

	},
};

ClassSubList["nightbringer-rage engine"] = {
};

ClassSubList["nightbringer-shadow engine"] = {

};
