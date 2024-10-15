class Inventory {
    constructor() {
        this.items = [];
        this.nextId = 1;
        this.initializeInventory();
    }

    initializeInventory() {
        const sampleParts = [
            { name: 'Oil Filter', quantity: 100, price: 9.99 },
            { name: 'Brake Pad', quantity: 75, price: 49.99 },
            { name: 'Headlight', quantity: 50, price: 29.99 },
            { name: 'Windshield Wiper', quantity: 80, price: 15.99 },
            { name: 'Spark Plug', quantity: 200, price: 3.99 },
            { name: 'Battery', quantity: 30, price: 89.99 },
            { name: 'Air Filter', quantity: 60, price: 12.99 },
            { name: 'Fuel Pump', quantity: 40, price: 119.99 },
            { name: 'Radiator', quantity: 20, price: 199.99 },
            { name: 'Alternator', quantity: 25, price: 149.99 },
            { name: 'Starter Motor', quantity: 35, price: 109.99 },
            { name: 'Timing Belt', quantity: 45, price: 39.99 },
            { name: 'Oil Pan', quantity: 30, price: 75.99 },
            { name: 'Exhaust Pipe', quantity: 50, price: 59.99 },
            { name: 'Fuel Filter', quantity: 65, price: 14.99 },
            { name: 'Power Steering Pump', quantity: 20, price: 129.99 },
            { name: 'Control Arm', quantity: 15, price: 89.99 },
            { name: 'Wheel Bearing', quantity: 40, price: 24.99 },
            { name: 'Brake Rotor', quantity: 60, price: 79.99 },
            { name: 'CV Joint', quantity: 30, price: 69.99 },
            { name: 'Oxygen Sensor', quantity: 25, price: 49.99 },
            { name: 'Temperature Sensor', quantity: 45, price: 34.99 },
            { name: 'Throttle Body', quantity: 15, price: 199.99 },
            { name: 'Ignition Coil', quantity: 55, price: 45.99 },
            { name: 'Fuel Injector', quantity: 40, price: 79.99 },
            { name: 'Drive Shaft', quantity: 10, price: 159.99 },
            { name: 'Suspension Strut', quantity: 20, price: 89.99 },
            { name: 'Brake Caliper', quantity: 30, price: 129.99 },
            { name: 'Master Cylinder', quantity: 12, price: 110.99 },
            { name: 'Clutch Kit', quantity: 18, price: 199.99 },
            { name: 'Transmission Filter', quantity: 22, price: 29.99 },
            { name: 'Axle Shaft', quantity: 27, price: 149.99 },
            { name: 'Fuel Tank', quantity: 15, price: 299.99 },
            { name: 'Camshaft', quantity: 10, price: 400.00 },
            { name: 'Crankshaft', quantity: 12, price: 350.00 },
            { name: 'Piston', quantity: 60, price: 59.99 },
            { name: 'Timing Chain', quantity: 30, price: 80.00 },
            { name: 'Valve Cover', quantity: 20, price: 45.99 },
            { name: 'Head Gasket', quantity: 18, price: 49.99 },
            { name: 'Engine Mount', quantity: 40, price: 65.99 },
            { name: 'Differential', quantity: 10, price: 299.99 },
            { name: 'Suspension Spring', quantity: 25, price: 55.99 },
            { name: 'Tire Pressure Sensor', quantity: 50, price: 24.99 },
            { name: 'Fuel Line', quantity: 30, price: 15.99 },
            { name: 'Radiator Hose', quantity: 22, price: 19.99 },
            { name: 'Battery Cable', quantity: 18, price: 29.99 },
            { name: 'EGR Valve', quantity: 10, price: 89.99 },
            { name: 'Mass Airflow Sensor', quantity: 15, price: 79.99 },
            { name: 'Blower Motor', quantity: 12, price: 99.99 },
            { name: 'AC Compressor', quantity: 8, price: 299.99 },
            { name: 'Heater Core', quantity: 10, price: 120.00 },
            { name: 'Ignition Switch', quantity: 30, price: 29.99 },
            { name: 'Brake Light Switch', quantity: 35, price: 19.99 },
            { name: 'Turn Signal Switch', quantity: 25, price: 24.99 },
            { name: 'Window Regulator', quantity: 40, price: 75.99 },
            { name: 'Door Handle', quantity: 30, price: 15.99 },
            { name: 'Bumper Cover', quantity: 20, price: 199.99 },
            { name: 'Fender', quantity: 12, price: 89.99 },
            { name: 'Hood', quantity: 10, price: 150.00 },
            { name: 'Trunk Lid', quantity: 8, price: 120.00 },
            { name: 'Windshield', quantity: 5, price: 250.00 },
            { name: 'Tailgate', quantity: 7, price: 200.00 },
        ];

        sampleParts.forEach(part => {
            this.addItem(part.name, part.quantity, part.price);
        });
    }

    addItem(name, quantity, price) {
        const newItem = { id: this.nextId++, name, quantity, price };
        this.items.push(newItem);
        console.log(`Added: ${name}`);
        this.displayInventory();
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        console.log(`Removed item with ID: ${id}`);
        this.displayInventory();
    }

    displayInventory() {
        console.clear();
        console.table(this.items);
    }

    start() {
        while (true) {
            const action = prompt("Enter 'add' to add a part, 'remove' to remove a part, or 'exit' to quit:");
            if (action === 'add') {
                const name = prompt("Enter the part name:");
                const quantity = parseInt(prompt("Enter the quantity:"));
                const price = parseFloat(prompt("Enter the price:"));
                this.addItem(name, quantity, price);
            } else if (action === 'remove') {
                const id = parseInt(prompt("Enter the ID of the item to remove:"));
                this.removeItem(id);
            } else if (action === 'exit') {
                break;
            } else {
                alert("Invalid action. Please enter 'add', 'remove', or 'exit'.");
            }
        }
    }
}

// Initialize inventory system
const inventory = new Inventory();
inventory.start();