/*
ESMERLIN JOEL MIESES
2016-4379
*/

// Variables
const historialList = document.getElementById('historial-list');

// Functions
function c(val)
{
 document.getElementById('d').value=val;
}

function v(val)
{
    document.getElementById('d').value+=val;
}

function e() 
{ 
    try
    {
        var val = document.getElementById('d').value;
        // When the form is send
        document.querySelector('#form').addEventListener('submit', addResult(val));
        c(eval(val)); 
    }
    catch(e) 
    {
        c('Error');
    } 
}


// Event Listeners
eventListeners();

function eventListeners()
{
    // Delete result of the list
    historialList.addEventListener('click', deleteElement);

    // Get list of results on Contet
    document.addEventListener('DOMContentLoaded', getlocalStorageElements);
}

// Functions

// Add result to form

function addResult(e)
{
    // Read value of calculate
    var val = document.getElementById('d').value;
    var result = val + ' = ' + eval(val);
    
    // Add result to localstorage
    addLocalStorage(result);
}

function deleteElement(e)
{
    e.preventDefault();
    if(e.target.className === 'button pink')
    {   
        deleteResultLocalStorage(e.target.parentElement.innerText);
        e.target.parentElement.remove();
    } 
}

// Add result to localstorage

function addLocalStorage(val){
    var results;
    results = getResultsLocalStorage();

    results.push(val);

    localStorage.setItem('results', JSON.stringify(results));
}

// Get results exist on localstorage
function getResultsLocalStorage(){
    let results;
    if (localStorage.getItem('results') === null){
        results = [];
    } else {
        results = JSON.parse(localStorage.getItem('results'));
    }
    return results;
}

// List elements from localstorage

function getlocalStorageElements(){
    let results;

    results = getResultsLocalStorage();
    results.forEach(function(result) {
        // Create delete button of results
        var deleteBtn = document.createElement('button');
        deleteBtn.classList = 'button pink';
        deleteBtn.innerHTML = 'x';

        // create element to list results
        var li = document.createElement('li');
        li.innerText = result;

        // Add element and button to list results
        li.appendChild(deleteBtn);
        historialList.appendChild(li);
    })
    
}

// Delete element to localstorage
function deleteResultLocalStorage(element){
    let results, elementDeleted;

    //Delete the x from element
    elementDeleted = element.substring(0, element.length - 1);

    results = getResultsLocalStorage();
    
    results.forEach(function(element, index) {
        if(elementDeleted === element){
            results.splice(index, 1);
        }
    });
    
    localStorage.setItem('results', JSON.stringify(results));
}



