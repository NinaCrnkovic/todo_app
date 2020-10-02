//TODO CLASS


class Todo
{
    constructor(...params)
    {
        this.input = document.querySelector(params[0]);
        this.addBtn = document.querySelector(params[1]);
        this.list = document.querySelector(params[2]);
        this.saveBtn = document.querySelector(params[3]);
        this.deleteBtn = document.querySelector(params[4]);
        this.storageKey = (params[5]);
    
    }

    resetInput(){
        this.input.value='';
        this.input.focus();

    }



    disableRemoveButton(li, removeBtn){
        if(li.classList.contains('done')){
            removeBtn.disabled= true;
        } else {
            removeBtn.disabled = false;
        }
    }


    markDone=(event)=>{
        const item = event.target;
        const li = item.parentNode;
        const removeBtn = li.querySelector('button');
              li.classList.toggle('done');
        if(li.classList.contains('done')){
            li.dataset.doneDate= new Date();
        }else{
            li.dataset.doneDate='';
        }
        this.disableRemoveButton(li, removeBtn);
     

    }



    addCheckbox(item){
        const checkbox = document.createElement('input');
              checkbox.setAttribute('type', 'checkbox');
              checkbox.addEventListener('click', this.markDone);
        item.insertBefore(checkbox, item.firstChild)      
    }



    removeItem(item){
        const removeBtn = event.target;
        const li = removeBtn.parentNode;
        if(!li.classList.contains('done')){
            li.remove();
        }
      
    }



    addRemoveBtn(item){
        const removeBtn= document.createElement('button');
              removeBtn.setAttribute('type', 'button');
              removeBtn.setAttribute('class', 'button-trash');
              removeBtn.innerHTML='<i class="icon-trash"></i>';

              removeBtn.addEventListener('click', this.removeItem);
        item.appendChild(removeBtn);
    }



    createItem(task){
        const item = document.createElement('li');
              item.innerHTML='<p>'+ task +'</p>';
              item.dataset.doneDate='';
             
        this.addCheckbox(item);
        this.addRemoveBtn(item);      
        return item;        
        
    }



    addTask=(event)=>{
        const task= this.input.value;
        if(!task){
            alert('Unesite task!');
            return false
        }
        const item=this.createItem(task);
        this.list.appendChild(item);
        this.resetInput();
      
    }



    saveTasks=(event)=>{
       

        if(window.localStorage !== undefined){
            const li = this.list.querySelectorAll('li');
            if(li.length > 0){
                const tasks = {};

                for(let i=0; i<li.length; i++){
                    let checkbox = li[i].querySelector('input');
                    tasks['task' + (i + 1)] = {
                        'task': checkbox.nextSibling.textContent,
                        'done':(li[i].classList.contains('done')) ? true:false,
                        'doneDate': li[i].dataset.doneDate
                    };
                   
                }
                localStorage.setItem(this.storageKey, JSON.stringify(tasks));
                return true;
            }
            alert('Niste dodali taskove')
        }else{
            alert('Preglednik ne podržava lokalnu pohranu')
        }
    }

    deleteTasks=(event)=>{
        this.list.innerHTML='';
        if(window.localStorage !== undefined){
            localStorage.removeItem(this.storageKey);
        }else{
            alert('Preglednik ne podržava lokalnu pohranu')
        }
    }



    pressEnter=(event)=>{
        if(event.keyCode === 13){
            this.addTask();
        }
    }




    addListeners(){
        this.addBtn.addEventListener('click', this.addTask);
        this.input.addEventListener('keydown', this.pressEnter);
        this.saveBtn.addEventListener('click', this.saveTasks);
        this.deleteBtn.addEventListener('click', this.deleteTasks);
        
        
    }
    checkStorage(){
        if(window.localStorage !== undefined){
            let savedTasks = localStorage.getItem(this.storageKey);

            if (savedTasks !== null){
                savedTasks=JSON.parse(savedTasks);
                for(const [key, value] of Object.entries(savedTasks)){
                    const item = this.createItem(value.task);
                    if (value.done){
                        item.classList.add('done');
                        item.querySelector('input').checked = true;
                        item.querySelector('button').disabled = true;
                        item.dataset.doneDate = value.doneDate;
                    }

                    this.list.appendChild(item);
                }
            }
           
        }else{
            alert('Preglednik ne podržava lokalnu pohranu');
        }
    
    }

    init(){ //pokrenuti će event lisenere
        this.checkStorage();
        this.addListeners();
    }

}

export {Todo};

///// datum i vrijeme kada smo čekirali i da to spremi i gumb za brisanje svega iz local storaga
