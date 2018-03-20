var first = document.getElementById('first');
var second = document.getElementById('second');
var accBtn = document.querySelector('#accBtn');
var addBtn = document.querySelector('#addBtn');
var editBtn = document.querySelector('#editBtn');
var accTable = document.querySelector('#accTable');
var addAcc = document.querySelector('#addAcc');
var addAccBtn = document.querySelector('#addAccBtn');
var inputID = document.querySelector('#inputID');
var inputName = document.querySelector('#inputName');
var inputDep = document.querySelector('#inputDep');
var inputCCard = document.querySelector('#inputCCard');
var editDelete = document.querySelector('#editDelete');
var obj = {};
var editFormTableRow = document.querySelector('#editFormTableRow');
var editformId = document.querySelector('#editformId');
var editformName = document.querySelector('#editformName');
var editformDeposit = document.querySelector('#editformDeposit');
var editformCcard = document.querySelector('#editformCcard');
var editaddFormAccBtn = document.querySelector('#editaddFormAccBtn');



// sasha Start
account = dohvatiAccounte();

if (!account || !account.length) {
  // ako nema accountova u localstorage, dodaj neke pocetne
  account = [{
      id: 1,
      name: "Nikola",
      deposit: 1000000,
      creditCard: "Visa"
    },
    {
      id: 2,
      name: "Milinko",
      deposit: 1215458,
      creditCard: "Master Card"
    },
    {
      id: 3,
      name: "Milos",
      deposit: 12587889,
      creditCard: "American Express"
    }
  ];
  sacuvajAccounte(account);
}
else {
  // u suprotnom nista, posto su vec dohvaceni i sacuvani u var `account`
}
// sasha End

tabela();

accBtn.addEventListener('click', showHide);

function showHide() {
  accTable.style.display = 'block';
  addAcc.style.display = 'none';
  editDelete.style.display = 'none';
  editFormTableRow.style.display = 'none';
}

addBtn.addEventListener('click', dodaj);

function dodaj() {
  accTable.style.display = 'none';
  addAcc.style.display = 'block';
  editDelete.style.display = 'none';
  editFormTableRow.style.display = 'none';
}


addAccBtn.addEventListener('click', addNewOne);

function addNewOne() {
  obj = {
    id: inputID.value,
    name: inputName.value,
    deposit: inputDep.value,
    creditCard: inputCCard.value,
  };
  if (inputID.value == "" || inputName.value == "" || inputDep.value == "" || inputCCard.value == "") {
    alert("You must fill all fields !!!");
    return false;
  };
  account.push(obj);
  showHide();
  tabela();
  inputID.value = "";
  inputName.value = "";
  inputDep.value = "";
  inputCCard.value = "";
  // sasha Start
  sacuvajAccounte(account);
  // sasha End
}

editBtn.addEventListener('click', action);

function action() {
  let text = '';
  for (var i = 0; i < account.length; i++) {
    text += '<tr>';
    text += '<td>' + account[i].id + '</td>';
    text += '<td>' + account[i].name + '</td>';
    text += '<td>' + account[i].deposit + '</td>';
    text += '<td>' + account[i].creditCard + '</td>'
    text += '<td><button data-index="' + i + '" class="edit btn-sm btn-success">edit</button></td>';
    text +='<td><button  id="' + i + '" class="delete btn-sm btn-danger">delete</button></td>';
    text += '</tr>';
  };

  second.innerHTML = text;
  var editAcc = document.querySelectorAll('.edit');
  var delAcc = document.querySelectorAll('.delete');

  for (let i = 0; i < delAcc.length; i++) {
    delAcc[i].addEventListener('click',delAccFromDb);
    editAcc[i].addEventListener('click',editAccFromDb);
  }


  accTable.style.display = 'none';
  addAcc.style.display = 'none';
  editDelete.style.display = 'block';
  editFormTableRow.style.display = 'none';
};

function delAccFromDb() {
  account.splice(this.id,1);
  sacuvajAccounte(account);
  tabela();
};

function editAccFromDb() {
  accTable.style.display = 'none';
  addAcc.style.display = 'none';
  editDelete.style.display = 'none';
  editFormTableRow.style.display = 'block';

  index = this.getAttribute('data-index');
  let db = account[index];

  editformId.value = db.id;
  editformName.value = db.name;
  editformDeposit.value = db.deposit;
  editformCcard.value = db.creditCard;
};

editaddFormAccBtn.addEventListener('click',editAccountInDb);

function editAccountInDb() {
  var editedAccount = {
    id : editformId.value,
    name : editformName.value,
    deposit : editformDeposit.value,
    creditCard : editformCcard.value
  };
  account[index] = editedAccount;
  sacuvajAccounte(account);
  tabela();
}

function tabela() {
  let text = '';
  for (var i = 0; i < account.length; i++) {
    text += '<tr><td>' + account[i].id + '</td>' + '<td>' + account[i].name + '</td>' + '<td>' + account[i].deposit + '</td>' + '<td>' + account[i].creditCard + '</td></tr>';
  };
  first.innerHTML = text;
  accTable.style.display = 'block';
  addAcc.style.display = 'none';
  editDelete.style.display = 'none';
  editFormTableRow.style.display = 'none';
};

// sasha Start
function dohvatiAccounte() {
  return JSON.parse(localStorage.getItem('accounts'));
}

function sacuvajAccounte(accounts) {
  localStorage.setItem('accounts', JSON.stringify(accounts));
}
// sasha End
