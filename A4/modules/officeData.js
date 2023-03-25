const fs = require("fs");

class Data{

    constructor(employees, classes){
        this.employees = employees;
        this.classes = classes;
    }
}

let dataCollection = null;

module.exports.initialize = function(){
    return new Promise((resolve, reject)=>{
        fs.readFile('./data/employees.json', 'utf8', (err,employeesData)=>{
            if(err){
                reject("Unable to load employees"); return;
            }

            fs.readFile('./data/classes.json', 'utf8', (err,classesData)=>{
                if(err){
                    reject("Unable to load classes"); return;
                }

                dataCollection = new Data(JSON.parse(employeesData), JSON.parse(classesData));
                resolve();
            });
        });
    });
}

module.exports.getAllEmployees = function(){
    return new Promise((resolve, reject)=>{
        if (dataCollection.employees.length == 0){
            reject("no results returned"); return;
        }
        resolve(dataCollection.employees);
    });
}

module.exports.getClasses = function() {
    return new Promise((resolve, reject) =>{
        if (dataCollection.classes.length==0){
            reject("query returned 0 results");
            return;
        }
        resolve(dataCollection.classes);
   });
  }

module.exports.getEAs = function(){
    return new Promise(function(resolve, reject){
        var EmployeesEA = [];
        for(let i = 0; i < dataCollection.employees.length; i++){
            if (dataCollection.employees[i].EA == true){
                EmployeesEA.push(dataCollection.employees[i]);
            }
        }
        if (EmployeesEA.length == 0){
            reject("no results returned"); return;
        }
        resolve(EmployeesEA);
    })
}

module.exports.getPartTimers = function(){
    return new Promise(function(resolve, reject){
       var EmployeesPT = [];
       for(let i = 0; i <dataCollection.employees.length; i++){
           if (dataCollection.employees[i].status == 'Part Time'){
               EmployeesPT.push(dataCollection.employees[i]);
           }
       }
       if(EmployeesPT.length == 0){
           reject("no result returned"); return;
       }
       resolve(EmployeesPT);
    })

}

module.exports.getEmployeeByNum = function(num){
    return new Promise(function(resolve, reject){
        var EmployeesNum = null;
        for(let i = 0; i < dataCollection.employees.length; i++){
            if (dataCollection.employees[i].employeeNum == num){
                EmployeesNum = dataCollection.employees[i];
            }
        }

        if (!EmployeesNum){
            reject("no results returned"); return;
        }
            resolve(EmployeesNum);
    });
};