const fs = require("fs");
class Data {
    constructor(employees, classes){
        this.employees = employees;
        this.classes = classes;
    }
}

let dataCollection = null;

module.exports.initialize = function() {
    return new Promise((resolve,reject) =>{
        fs.readFile('./data/classes.json', 'utf-8', (err,classesData) => {
            if (err){
                reject("unable to load classes"); 
                return;
            }

            fs.readFile('./data/employees.json', 'utf-8', (err,employeeData) => {
                if (err) {
                    reject("unable to load employees");
                    return;
                }
                dataCollection = new Data(JSON.parse(employeeData), JSON.parse(classesData))
                resolve();

            });

        });

    });
}

module.exports.getAllEmployees = function() {
return new Promise((resolve,reject) => {
    if(dataCollection.employees.length == 0) {
        reject('query returned 0 results');
        return;
    }
    resolve(dataCollection.employees)

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

module.exports.getEAs = function() {
    return new Promise(function(resolve, reject){
        var filteremployees = [];
        for (let i=0; i<dataCollection.employees.length; i++){
            if(dataCollection.employees[i].EA == true){
                filteremployees.push(dataCollection.employees[i]);
            }
        }
        if (filteremployees.length ==0){
            reject("query returned 0 results");
            return;
        }
        resolve(filteremployees)



    });
}

module.exports.getPartTimers = function(){
    return new Promise(function(resolve, reject){
       var PartTimeEmp = [];
       for(let i = 0; i <dataCollection.employees.length; i++){
           if (dataCollection.employees[i].status == 'Part Time'){
               PartTimeEmp.push(dataCollection.employees[i]);
           }
       }
       if(PartTimeEmp.length == 0){
           reject("no result returned"); return;
       }
       resolve(PartTimeEmp);
    })

}