const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return "Manager";
    }

    generateCard() {
        let card = `
        <div class="col mb-4">
            <div class="card bg-light mb-3" style="max-width: 18rem;">
                <div class="card-header" style="background-color: blue; color: white;">
                    <h3>${this.name}</h3>
                    <h4><i class="fas fa-mug-hot" style="margin-right: 5px;"></i>Manager</h4>
                </div>
                <div class="card-body justify-content-center shadow">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${this.id}</li>
                        <li class="list-group-item">Email: <a href="${this.email}">${this.email}</a></li>
                        <li class="list-group-item">Office Number: ${this.officeNumber}</li>
                    </ul>
                </div>
            </div>
        </div>
    `
    return card;
    }
}
module.exports = Manager;