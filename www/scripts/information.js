class Information {
      constructor(id) { 
       this.id = id;
       this.countries = [];
       this.people = [];
      }
      showHome() { 
        document.getElementById("headerTitle").textContent = "HOME";
        document.getElementById("divInformation").replaceChildren();
       }
    
      showPerson() { 
        document.getElementById("headerTitle").textContent = "PERSON";

        let table = document.createElement("table");
        table.appendChild(tableLine(new Person(), true));
        this.people.forEach(p => {
            table.appendChild(tableLine(p,false));
        });
        document.getElementById("divInformation").replaceChildren(table);
       }

      addPerson() {
        var data = {};
        data.name=document.getElementById("userName").value;
        data.email=document.getElementById("userEmail").value;
        data.phone=document.getElementById("userPhone").value;
        data.password=document.getElementById("userPassword").value;
        data.userType=document.getElementById("userType").value;
        var json = JSON.stringify(data);

        let self=this;
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "user", true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                self.people=JSON.parse(this.responseText).people;
            }
        };
        xhr.send();
      }

      getUsers() {
        let self=this;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "person", true);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                self.people=JSON.parse(this.responseText).people;
            }
        };
        xhr.send();
      }

      updatePerson(id) {
        var data = {};
        data.id=document.getElementById("personId").value;
        data.name=document.getElementById("personName").value;
        data.birthDate=document.getElementById("personDate").value;
        data.idCountry=document.getElementById("personCountry").value;
        var json = JSON.stringify(data);

        let self=this;
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", "person/" + id, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                self.people=JSON.parse(this.responseText).people;
            }
        };

      }

      deletePerson(id) {
        let self=this;
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", "person/" + id, true);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                self.people=JSON.parse(this.responseText).people;
            }
        };
        xhr.send();
      }

    }
    