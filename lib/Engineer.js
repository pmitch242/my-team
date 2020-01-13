const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name, id, email);
        this.github = github;
    }

    getGithub(){
        return this.github;
    }
    
    getRole(){
        return "Engineer";
    }

    generateCard(){
        let card = `
        <div class="col mb-4">
            <div class="card bg-light mb-3 h-100" style="max-width: 18rem;">
                <div class="card-header" style="background-color: blue; color: white;">
                    <h3>${this.name}</h3>
                    <h4><i class="fas fa-glasses" style="margin-right: 5px;"></i>Engineer</h4>
                </div>
                <div class="card-body justify-content-center shadow">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${this.id}</li>
                        <li class="list-group-item">Email: <a href="${this.email}">${this.email}</a></li>
                        <li class="list-group-item">GitHub: ${this.github}</li>
                    </ul>
                </div>
            </div>
        </div>
        `
        return card;
    }
}

module.exports = Engineer;