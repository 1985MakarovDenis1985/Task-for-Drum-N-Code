import mocha from "mocha";
import "mocha/mocha.css";

class PowerPlant {
    constructor() {
        this.id = createUUID();
        this.isActive = true;
        this.householdsConnected = [];
    }
}

class Household {
    constructor() {
        this.id = createUUID();
        this.root = this.id;
        this.powerPlantsConnected = [];
        this.householdsConnected = [];
        this.activePowerPlants = this.powerPlantsConnected.length;
    }
}

function createUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}


class World {
    constructor() {
        this.powerPlants = {};
        this.households = {};
        //
        // this.Household = {
        //     farm: true,
        //     electricity: false,
        //     powerPlantsConnecting: []
        // }
        //
        // this.PowerPlant = {
        //     power: true,
        //     exist: true,
        //     id: this.createUUID()
        // }
    }

    createPowerPlant() {
        this.powerPlants = new PowerPlant()
        // console.log(this.powerPlants)
        return this.powerPlants
        throw new Error("Not Implemented");
    }

    createHousehold() {
        this.houseHold = new Household()
        // console.log(this.houseHold)
        return this.houseHold
        throw new Error("Not Implemented");
    }

    connectHouseholdToPowerPlant(household, powerPlant) {
        // household.powerPlantsConnected = []
        // if (powerPlant.isActive) {
        household.powerPlantsConnected.push(powerPlant)
        powerPlant.householdsConnected.push(household)
        household.activePowerPlants++
        // }
        household.powerPlantsConnected = household.powerPlantsConnected.filter(el => el.isActive === true)
        // console.log("house", household.powerPlantsConnected)
        // console.log("power", powerPlant)
        return household
        throw new Error("Not Implemented");
    }

    connectHouseholdToHousehold(household1, household2) {
        throw new Error("Not Implemented");
    }

    disconnectHouseholdFromPowerPlant(household, powerPlant) {
        household.powerPlantsConnected = household.powerPlantsConnected.filter(el => el.id != powerPlant.id)

        return household

        throw new Error("Not Implemented");
    }

    killPowerPlant(powerPlant) {
        // console.log(powerPlant)
        powerPlant.isActive = false;
        this.houseHold.powerPlantsConnected = this.houseHold.powerPlantsConnected.filter(el => el != powerPlant.id)
        // console.log(this.houseHold.powerPlantsConnected)


        return this.houseHold

        throw new Error("Not Implemented");
    }

    repairPowerPlant(powerPlant) {
        powerPlant.isActive = true
        this.houseHold.powerPlantsConnected.push(powerPlant.id)
        // console.log(powerPlant)
        return this.houseHold
        throw new Error("Not Implemented");
    }

    householdHasEletricity(household) {
        // console.log(household.powerPlantsConnected)
        let a = household.powerPlantsConnected.filter(el => el.isActive === true)
        // console.log(a)
        a.map(el => console.log(el))
        if (a.length === 0) {
            return false
        } else if (a.length > 0) {
            return true
        }
        throw new Error("Not Implemented");
    }

}

const assert = {
    equal(a, b) {
        if (a != b) {
            throw new Error("Assertion Failed");
        }
    }
};

/*

	The code below tests your implementation. You can consider the task finished
	when all the test do pass. Feel free to read the tests, but please don't alter them.

*/

window.mocha.setup("bdd");

describe("Households + Power Plants", function () {
    it("Household has no electricity by default", () => {
        const world = new World();
        const household = world.createHousehold();
        assert.equal(world.householdHasEletricity(household), false);
    });

    it("Household has electricity if connected to a Power Plant", () => {
        const world = new World();
        const household = world.createHousehold();
        const powerPlant = world.createPowerPlant();

        world.connectHouseholdToPowerPlant(household, powerPlant);

        assert.equal(world.householdHasEletricity(household), true);
    });
    // //
    it("Household won't have Electricity after disconnecting from the only Power Plant", () => {
        const world = new World();
        const household = world.createHousehold();
        const powerPlant = world.createPowerPlant();

        world.connectHouseholdToPowerPlant(household, powerPlant);

        assert.equal(world.householdHasEletricity(household), true);

        world.disconnectHouseholdFromPowerPlant(household, powerPlant);
        assert.equal(world.householdHasEletricity(household), false);
    });

    it("Household will have Electricity as long as there's at least 1 alive Power Plant connected", () => {
    const world = new World();
    const household = world.createHousehold();

    const powerPlant1 = world.createPowerPlant();
    const powerPlant2 = world.createPowerPlant();
    const powerPlant3 = world.createPowerPlant();

    world.connectHouseholdToPowerPlant(household, powerPlant1);
    world.connectHouseholdToPowerPlant(household, powerPlant2);
    world.connectHouseholdToPowerPlant(household, powerPlant3);

    assert.equal(world.householdHasEletricity(household), true);

    world.disconnectHouseholdFromPowerPlant(household, powerPlant1);
    assert.equal(world.householdHasEletricity(household), true);

    world.killPowerPlant(powerPlant2);
    assert.equal(world.householdHasEletricity(household), true);
    // // //
    world.disconnectHouseholdFromPowerPlant(household, powerPlant3);
    assert.equal(world.householdHasEletricity(household), false);
    });

    it("Household won't have Electricity if the only Power Plant dies", () => {
        const world = new World();
        const household = world.createHousehold();
        const powerPlant = world.createPowerPlant();

        world.connectHouseholdToPowerPlant(household, powerPlant);

        assert.equal(world.householdHasEletricity(household), true);

        world.killPowerPlant(powerPlant);
        assert.equal(world.householdHasEletricity(household), false);
    });

    it("PowerPlant can be repaired", () => {
        const world = new World();
        const household = world.createHousehold();
        const powerPlant = world.createPowerPlant();

        world.connectHouseholdToPowerPlant(household, powerPlant);
        assert.equal(world.householdHasEletricity(household), true);

        world.killPowerPlant(powerPlant);
        assert.equal(world.householdHasEletricity(household), false);
        //
        world.repairPowerPlant(powerPlant);
        assert.equal(world.householdHasEletricity(household), true);
        //
        world.killPowerPlant(powerPlant);
        assert.equal(world.householdHasEletricity(household), false);
        //
        world.repairPowerPlant(powerPlant);
        assert.equal(world.householdHasEletricity(household), true);
    });

    it("Few Households + few Power Plants, case 1", () => {
        const world = new World();

        const household1 = world.createHousehold();
        const household2 = world.createHousehold();

        const powerPlant1 = world.createPowerPlant();
        const powerPlant2 = world.createPowerPlant();

        world.connectHouseholdToPowerPlant(household1, powerPlant1);
        world.connectHouseholdToPowerPlant(household1, powerPlant2);
        world.connectHouseholdToPowerPlant(household2, powerPlant2);

        // console.log("household1: ", household1.powerPlantsConnected)
        // console.log("household2: ", household2.powerPlantsConnected)
        // console.log("power: ", powerPlant1)
        // console.log("power: ", powerPlant2)

        // console.log("household1: ", household1)
        // console.log("household2: ", household2)

        assert.equal(world.householdHasEletricity(household1), true);
        assert.equal(world.householdHasEletricity(household2), true);

        world.killPowerPlant(powerPlant2);
        assert.equal(world.householdHasEletricity(household1), true);
        assert.equal(world.householdHasEletricity(household2), false);

        // console.log("household1: ", household1.powerPlantsConnected)
        // console.log("household2: ", household2.powerPlantsConnected)

        world.killPowerPlant(powerPlant1);
        //
        // console.log("household1: ", household1.powerPlantsConnected)
        // console.log("household2: ", household2.powerPlantsConnected)
        // console.log("power: ", powerPlant1)
        // console.log("power: ", powerPlant2)
        //
        //
        assert.equal(world.householdHasEletricity(household1), false);
        assert.equal(world.householdHasEletricity(household2), false);

    });

    it("Few Households + few Power Plants, case 2", () => {
        const world = new World();

        const household1 = world.createHousehold();
        const household2 = world.createHousehold();

        const powerPlant1 = world.createPowerPlant();
        const powerPlant2 = world.createPowerPlant();

        world.connectHouseholdToPowerPlant(household1, powerPlant1);
        world.connectHouseholdToPowerPlant(household1, powerPlant2);
        world.connectHouseholdToPowerPlant(household2, powerPlant2);

        world.disconnectHouseholdFromPowerPlant(household2, powerPlant2);

        assert.equal(world.householdHasEletricity(household1), true);
        assert.equal(world.householdHasEletricity(household2), false);

        world.killPowerPlant(powerPlant2);
        assert.equal(world.householdHasEletricity(household1), true);
        assert.equal(world.householdHasEletricity(household2), false);

        world.killPowerPlant(powerPlant1);
        assert.equal(world.householdHasEletricity(household1), false);
        assert.equal(world.householdHasEletricity(household2), false);
    });
    //
    it("Household + Power Plant, case 1", () => {
        const world = new World();

        const household = world.createHousehold();
        const powerPlant = world.createPowerPlant();

        assert.equal(world.householdHasEletricity(household), false);
        world.killPowerPlant(powerPlant);

        world.connectHouseholdToPowerPlant(household, powerPlant);

        assert.equal(world.householdHasEletricity(household), false);
    });
});

// describe("Households + Households + Power Plants", function () {
//     it("2 Households + 1 Power Plant", () => {
//         const world = new World();
//
//         const household1 = world.createHousehold();
//         const household2 = world.createHousehold();
//         const powerPlant = world.createPowerPlant();
//
//         world.connectHouseholdToPowerPlant(household1, powerPlant);
//         world.connectHouseholdToHousehold(household1, household2);
//
//         assert.equal(world.householdHasEletricity(household1), true);
//         assert.equal(world.householdHasEletricity(household2), true);
//
//         world.killPowerPlant(powerPlant);
//
//         assert.equal(world.householdHasEletricity(household1), false);
//         assert.equal(world.householdHasEletricity(household2), false);
//     });
//
//     it("Power Plant -> Household -> Household -> Household", () => {
//         const world = new World();
//
//         const household1 = world.createHousehold();
//         const household2 = world.createHousehold();
//         const household3 = world.createHousehold();
//         const powerPlant = world.createPowerPlant();
//
//         world.connectHouseholdToPowerPlant(household1, powerPlant);
//         world.connectHouseholdToHousehold(household1, household2);
//         world.connectHouseholdToHousehold(household2, household3);
//
//         assert.equal(world.householdHasEletricity(household1), true);
//         assert.equal(world.householdHasEletricity(household2), true);
//         assert.equal(world.householdHasEletricity(household3), true);
//
//         world.killPowerPlant(powerPlant);
//
//         assert.equal(world.householdHasEletricity(household1), false);
//         assert.equal(world.householdHasEletricity(household2), false);
//         assert.equal(world.householdHasEletricity(household3), false);
//
//         world.repairPowerPlant(powerPlant);
//
//         assert.equal(world.householdHasEletricity(household1), true);
//         assert.equal(world.householdHasEletricity(household2), true);
//         assert.equal(world.householdHasEletricity(household3), true);
//
//         world.disconnectHouseholdFromPowerPlant(household1, powerPlant);
//
//         assert.equal(world.householdHasEletricity(household1), false);
//         assert.equal(world.householdHasEletricity(household2), false);
//         assert.equal(world.householdHasEletricity(household3), false);
//     });
//
//     it("2 Households + 2 Power Plants", () => {
//         const world = new World();
//
//         const household1 = world.createHousehold();
//         const household2 = world.createHousehold();
//
//         const powerPlant1 = world.createPowerPlant();
//         const powerPlant2 = world.createPowerPlant();
//
//         world.connectHouseholdToPowerPlant(household1, powerPlant1);
//         world.connectHouseholdToPowerPlant(household2, powerPlant2);
//
//         assert.equal(world.householdHasEletricity(household1), true);
//         assert.equal(world.householdHasEletricity(household2), true);
//
//         world.killPowerPlant(powerPlant1);
//
//         assert.equal(world.householdHasEletricity(household1), false);
//         assert.equal(world.householdHasEletricity(household2), true);
//
//         world.connectHouseholdToHousehold(household1, household2);
//
//         assert.equal(world.householdHasEletricity(household1), true);
//         assert.equal(world.householdHasEletricity(household2), true);
//
//         world.disconnectHouseholdFromPowerPlant(household2, powerPlant2);
//
//         assert.equal(world.householdHasEletricity(household1), false);
//         assert.equal(world.householdHasEletricity(household2), false);
//     });
// });

window.mocha.run();

// -----------------------------------
// import mocha from "mocha";
// import "mocha/mocha.css";
//
// class PowerPlant {
//     constructor() {
//         this.id = createUUID();
//         this.isActive = true;
//         this.householdsConnected = [];
//     }
// }
//
// class Household {
//     constructor() {
//         this.id = createUUID();
//         this.root = this.id;
//         this.powerPlantsConnected = [];
//         this.householdsConnected = [];
//         this.activePowerPlants = 0;
//     }
// }
//
// function createUUID() {
//     return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
//         var r = (Math.random() * 16) | 0,
//             v = c === "x" ? r : (r & 0x3) | 0x8;
//         return v.toString(16);
//     });
// }
//
//
// class World {
//     constructor() {
//         this.powerPlants = {};
//         this.households = {};
//         //
//         // this.Household = {
//         //     farm: true,
//         //     electricity: false,
//         //     powerPlantsConnecting: []
//         // }
//         //
//         // this.PowerPlant = {
//         //     power: true,
//         //     exist: true,
//         //     id: this.createUUID()
//         // }
//     }
//
//     createPowerPlant() {
//         this.powerPlants = new PowerPlant()
//         // console.log(this.powerPlants)
//         return this.powerPlants
//         throw new Error("Not Implemented");
//     }
//
//     createHousehold() {
//         this.houseHold = new Household()
//         // console.log(this.houseHold)
//         return this.houseHold
//         throw new Error("Not Implemented");
//     }
//
//     connectHouseholdToPowerPlant(household, powerPlant) {
//         // household.powerPlantsConnected = []
//         let a = []
//         if (powerPlant.isActive) {
//             // a.push(powerPlant.id)
//             // household.powerPlantsConnected = [...a]
//
//             household.powerPlantsConnected.push(powerPlant.id)
//         }
//         return household
//         throw new Error("Not Implemented");
//     }
//
//     connectHouseholdToHousehold(household1, household2) {
//         throw new Error("Not Implemented");
//     }
//
//     disconnectHouseholdFromPowerPlant(household, powerPlant) {
//         const a = household.powerPlantsConnected.filter(el => el != powerPlant.id)
//         return household.powerPlantsConnected = a
//
//         throw new Error("Not Implemented");
//     }
//
//     killPowerPlant(powerPlant) {
//         console.log(powerPlant)
//         powerPlant.isActive = false;
//         // this.houseHold.powerPlantsConnected = this.houseHold.powerPlantsConnected.filter(el => el != powerPlant.id)
//         // console.log(this.houseHold.powerPlantsConnected)
//
//
//         return this.houseHold
//
//         throw new Error("Not Implemented");
//     }
//
//     repairPowerPlant(powerPlant) {
//         powerPlant.isActive = true
//         this.houseHold.powerPlantsConnected.push(powerPlant.id)
//         // console.log(powerPlant)
//         return this.houseHold
//         throw new Error("Not Implemented");
//     }
//
//     householdHasEletricity(household) {
//         // console.log(household.powerPlantsConnected)
//         if (household.powerPlantsConnected.length === 0) {
//             return false
//         } else if (household.powerPlantsConnected.length > 0) {
//             return true
//         }
//         throw new Error("Not Implemented");
//     }
//
// }
//
// const assert = {
//     equal(a, b) {
//         if (a != b) {
//             throw new Error("Assertion Failed");
//         }
//     }
// };
//
// /*
//
// 	The code below tests your implementation. You can consider the task finished
// 	when all the test do pass. Feel free to read the tests, but please don't alter them.
//
// */
//
// window.mocha.setup("bdd");
//
// describe("Households + Power Plants", function () {
//     // it("Household has no electricity by default", () => {
//     //     const world = new World();
//     //     const household = world.createHousehold();
//     //     assert.equal(world.householdHasEletricity(household), false);
//     // });
//     //
//     // it("Household has electricity if connected to a Power Plant", () => {
//     //     const world = new World();
//     //     const household = world.createHousehold();
//     //     const powerPlant = world.createPowerPlant();
//     //
//     //     world.connectHouseholdToPowerPlant(household, powerPlant);
//     //
//     //     assert.equal(world.householdHasEletricity(household), true);
//     // });
//     // //
//     // it("Household won't have Electricity after disconnecting from the only Power Plant", () => {
//     //     const world = new World();
//     //     const household = world.createHousehold();
//     //     const powerPlant = world.createPowerPlant();
//     //
//     //     world.connectHouseholdToPowerPlant(household, powerPlant);
//     //
//     //     assert.equal(world.householdHasEletricity(household), true);
//     //
//     //     world.disconnectHouseholdFromPowerPlant(household, powerPlant);
//     //     assert.equal(world.householdHasEletricity(household), false);
//     // });
//     //
//     // it("Household will have Electricity as long as there's at least 1 alive Power Plant connected", () => {
//     //     const world = new World();
//     //     const household = world.createHousehold();
//     //
//     //     const powerPlant1 = world.createPowerPlant();
//     //     const powerPlant2 = world.createPowerPlant();
//     //     const powerPlant3 = world.createPowerPlant();
//     //
//     //     world.connectHouseholdToPowerPlant(household, powerPlant1);
//     //     world.connectHouseholdToPowerPlant(household, powerPlant2);
//     //     world.connectHouseholdToPowerPlant(household, powerPlant3);
//     //
//     //     assert.equal(world.householdHasEletricity(household), true);
//     //
//     //     world.disconnectHouseholdFromPowerPlant(household, powerPlant1);
//     //     assert.equal(world.householdHasEletricity(household), true);
//     //     //
//     //     world.killPowerPlant(powerPlant2);
//     //     assert.equal(world.householdHasEletricity(household), true);
//     //     // //
//     //     world.disconnectHouseholdFromPowerPlant(household, powerPlant3);
//     //     assert.equal(world.householdHasEletricity(household), false);
//     // });
//     //
//     // it("Household won't have Electricity if the only Power Plant dies", () => {
//     //     const world = new World();
//     //     const household = world.createHousehold();
//     //     const powerPlant = world.createPowerPlant();
//     //
//     //     world.connectHouseholdToPowerPlant(household, powerPlant);
//     //
//     //     assert.equal(world.householdHasEletricity(household), true);
//     //
//     //     world.killPowerPlant(powerPlant);
//     //     assert.equal(world.householdHasEletricity(household), false);
//     // });
//     //
//     // it("PowerPlant can be repaired", () => {
//     //     const world = new World();
//     //     const household = world.createHousehold();
//     //     const powerPlant = world.createPowerPlant();
//     //
//     //     world.connectHouseholdToPowerPlant(household, powerPlant);
//     //     assert.equal(world.householdHasEletricity(household), true);
//     //
//     //     world.killPowerPlant(powerPlant);
//     //     assert.equal(world.householdHasEletricity(household), false);
//     //     //
//     //     world.repairPowerPlant(powerPlant);
//     //     assert.equal(world.householdHasEletricity(household), true);
//     //     //
//     //     world.killPowerPlant(powerPlant);
//     //     assert.equal(world.householdHasEletricity(household), false);
//     //     //
//     //     world.repairPowerPlant(powerPlant);
//     //     assert.equal(world.householdHasEletricity(household), true);
//     // });
//     //
//     it("Few Households + few Power Plants, case 1", () => {
//         const world = new World();
//
//         const household1 = world.createHousehold();
//         const household2 = world.createHousehold();
//
//         const powerPlant1 = world.createPowerPlant();
//         const powerPlant2 = world.createPowerPlant();
//
//         world.connectHouseholdToPowerPlant(household1, powerPlant1);
//         world.connectHouseholdToPowerPlant(household1, powerPlant2);
//         world.connectHouseholdToPowerPlant(household2, powerPlant2);
//
//         // console.log("household1: ", household1.powerPlantsConnected)
//         // console.log("household2: ", household2.powerPlantsConnected)
//         // console.log("power: ", powerPlant1)
//         // console.log("power: ", powerPlant2)
//
//         // console.log("household1: ", household1)
//         // console.log("household2: ", household2)
//
//         assert.equal(world.householdHasEletricity(household1), true);
//         assert.equal(world.householdHasEletricity(household2), true);
//
//         // world.killPowerPlant(powerPlant2);
//         // assert.equal(world.householdHasEletricity(household1), true);
//         // assert.equal(world.householdHasEletricity(household2), false);
//
//         // console.log("household1: ", household1.powerPlantsConnected)
//         // console.log("household2: ", household2.powerPlantsConnected)
//
//         world.killPowerPlant(powerPlant1);
//         //
//         console.log("household1: ", household1.powerPlantsConnected)
//         // console.log("household2: ", household2.powerPlantsConnected)
//         // console.log("power: ", powerPlant1)
//         // console.log("power: ", powerPlant2)
//         //
//         //
//         assert.equal(world.householdHasEletricity(household1), false);
//         assert.equal(world.householdHasEletricity(household2), false);
//
//     });
//     //
//     // it("Few Households + few Power Plants, case 2", () => {
//     //     const world = new World();
//     //
//     //     const household1 = world.createHousehold();
//     //     const household2 = world.createHousehold();
//     //
//     //     const powerPlant1 = world.createPowerPlant();
//     //     const powerPlant2 = world.createPowerPlant();
//     //
//     //     world.connectHouseholdToPowerPlant(household1, powerPlant1);
//     //     world.connectHouseholdToPowerPlant(household1, powerPlant2);
//     //     world.connectHouseholdToPowerPlant(household2, powerPlant2);
//     //
//     //     world.disconnectHouseholdFromPowerPlant(household2, powerPlant2);
//     //
//     //     assert.equal(world.householdHasEletricity(household1), true);
//     //     assert.equal(world.householdHasEletricity(household2), false);
//     //
//     //     world.killPowerPlant(powerPlant2);
//     //     assert.equal(world.householdHasEletricity(household1), true);
//     //     assert.equal(world.householdHasEletricity(household2), false);
//     //
//     //     world.killPowerPlant(powerPlant1);
//     //     assert.equal(world.householdHasEletricity(household1), false);
//     //     assert.equal(world.householdHasEletricity(household2), false);
//     // });
//     //
//     // it("Household + Power Plant, case 1", () => {
//     //     const world = new World();
//     //
//     //     const household = world.createHousehold();
//     //     const powerPlant = world.createPowerPlant();
//     //
//     //     assert.equal(world.householdHasEletricity(household), false);
//     //     world.killPowerPlant(powerPlant);
//     //
//     //     world.connectHouseholdToPowerPlant(household, powerPlant);
//     //
//     //     assert.equal(world.householdHasEletricity(household), false);
//     // });
// });
//
// // describe("Households + Households + Power Plants", function () {
// //     it("2 Households + 1 Power Plant", () => {
// //         const world = new World();
// //
// //         const household1 = world.createHousehold();
// //         const household2 = world.createHousehold();
// //         const powerPlant = world.createPowerPlant();
// //
// //         world.connectHouseholdToPowerPlant(household1, powerPlant);
// //         world.connectHouseholdToHousehold(household1, household2);
// //
// //         assert.equal(world.householdHasEletricity(household1), true);
// //         assert.equal(world.householdHasEletricity(household2), true);
// //
// //         world.killPowerPlant(powerPlant);
// //
// //         assert.equal(world.householdHasEletricity(household1), false);
// //         assert.equal(world.householdHasEletricity(household2), false);
// //     });
// //
// //     it("Power Plant -> Household -> Household -> Household", () => {
// //         const world = new World();
// //
// //         const household1 = world.createHousehold();
// //         const household2 = world.createHousehold();
// //         const household3 = world.createHousehold();
// //         const powerPlant = world.createPowerPlant();
// //
// //         world.connectHouseholdToPowerPlant(household1, powerPlant);
// //         world.connectHouseholdToHousehold(household1, household2);
// //         world.connectHouseholdToHousehold(household2, household3);
// //
// //         assert.equal(world.householdHasEletricity(household1), true);
// //         assert.equal(world.householdHasEletricity(household2), true);
// //         assert.equal(world.householdHasEletricity(household3), true);
// //
// //         world.killPowerPlant(powerPlant);
// //
// //         assert.equal(world.householdHasEletricity(household1), false);
// //         assert.equal(world.householdHasEletricity(household2), false);
// //         assert.equal(world.householdHasEletricity(household3), false);
// //
// //         world.repairPowerPlant(powerPlant);
// //
// //         assert.equal(world.householdHasEletricity(household1), true);
// //         assert.equal(world.householdHasEletricity(household2), true);
// //         assert.equal(world.householdHasEletricity(household3), true);
// //
// //         world.disconnectHouseholdFromPowerPlant(household1, powerPlant);
// //
// //         assert.equal(world.householdHasEletricity(household1), false);
// //         assert.equal(world.householdHasEletricity(household2), false);
// //         assert.equal(world.householdHasEletricity(household3), false);
// //     });
// //
// //     it("2 Households + 2 Power Plants", () => {
// //         const world = new World();
// //
// //         const household1 = world.createHousehold();
// //         const household2 = world.createHousehold();
// //
// //         const powerPlant1 = world.createPowerPlant();
// //         const powerPlant2 = world.createPowerPlant();
// //
// //         world.connectHouseholdToPowerPlant(household1, powerPlant1);
// //         world.connectHouseholdToPowerPlant(household2, powerPlant2);
// //
// //         assert.equal(world.householdHasEletricity(household1), true);
// //         assert.equal(world.householdHasEletricity(household2), true);
// //
// //         world.killPowerPlant(powerPlant1);
// //
// //         assert.equal(world.householdHasEletricity(household1), false);
// //         assert.equal(world.householdHasEletricity(household2), true);
// //
// //         world.connectHouseholdToHousehold(household1, household2);
// //
// //         assert.equal(world.householdHasEletricity(household1), true);
// //         assert.equal(world.householdHasEletricity(household2), true);
// //
// //         world.disconnectHouseholdFromPowerPlant(household2, powerPlant2);
// //
// //         assert.equal(world.householdHasEletricity(household1), false);
// //         assert.equal(world.householdHasEletricity(household2), false);
// //     });
// // });
//
// window.mocha.run();
