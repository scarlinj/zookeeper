const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require("../lib/zookeepers.js");
const {
    zookeeper
} = require("../data/zookeepers");

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper({
            name: "Darlene",
            id: "jhgdja3ng2"
        },
        zookeeper
    );

    expect(zookeeper.name).toBe("Darlene");
    expect(zookeeper.id).toBe("jhgdja3ng2");
});

test("filters by query", () => {
    const startingZookeeper = [{
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["quirky", "rash"],
        },
        {
            id: "4",
            name: "Noel",
            species: "bear",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"],
        },
    ];

    const updatedZookeeper = filterByQuery({
        species: "gorilla"
    }, startingZookeeper);

    expect(updatedZookeeper.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeeper = [{
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["quirky", "rash"],
        },
        {
            id: "4",
            name: "Noel",
            species: "bear",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"],
        },
    ];

    const result = findById("3", startingZookeeper);

    expect(result.name).toBe("Erica");
});

test("validates personality traits", () => {
    const zookeeper = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
        personalityTraits: ["quirky", "rash"],
    };

    const invalidZookeeper = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});