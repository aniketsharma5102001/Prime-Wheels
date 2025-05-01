import { faker } from "@faker-js/faker";
function createRandomCarList() {
    return {
        name: faker.vehicle.vehicle(),
        fuelType: faker.vehicle.fuel(),
        model: faker.vehicle.model(),
        type: faker.vehicle.type(),
    
        image: '/bmw.jpeg',
        miles: 1000,
        geartype: 'Automatic',
        price: faker.finance.amount({ min: 4000, max: 20000 })
    };
}

const carlist=faker.helpers.multiple(createRandomCarList,{count:7

})
export default{carlist }