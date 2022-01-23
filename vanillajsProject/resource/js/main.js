(function() {

    const _todoForm = document.querySelector('.todoform');
    const _loginForm = document.querySelector('.loginform');
    const _inputWrap = document.querySelector('.ipt_wrap');
    const _inputs = document.querySelectorAll('.ipt');
    const _delBtn = document.querySelectorAll('.btn_delete');
    const _todo = document.querySelector('.todo');
    const todoList_key = "todoList"
    const user_id = "userID"
    let todoArr = [];
    let userId = [];

    function saveTodoList() {
        localStorage.setItem(todoList_key, JSON.stringify(todoArr))
    }

    function saveUserId() {
        localStorage.setItem(user_id, JSON.stringify(userId))
    }

    _inputs.forEach(function(ipt) {
        
        ipt.addEventListener('focus', function() {
            if(this.value.length != 0) {
                classAttach(ipt);
            }
        })

        ipt.addEventListener('focusout', function() {
            if(this.value.length == 0 ) {
                classDetach(ipt);
            };
        })

        ipt.addEventListener('keydown', function() {
            
            if(this.value.length !== 0){
                classAttach(ipt);
            }else {
                classDetach(ipt);
            }
        })

        ipt.addEventListener('keyup', function() {
            if(this.value.length !== 0){
                classAttach(ipt);
            }else {
                classDetach(ipt);
            }
        })

    })

    _delBtn.forEach(function(delbtn) {

        delbtn.addEventListener('click', function(e) {

            var thisInput = this.parentNode.querySelector('input');
            var thisInputPlaceholder = thisInput.getAttribute('placeholder');
    
            thisInput.value = "";
            thisInput.setAttribute('placeholder', thisInputPlaceholder);

            classDetach(thisInput);
    
        })
    })
    
    function classAttach(target) {   
        target.parentNode.classList.add('has_value')

    }

    function classDetach(target) {
        target.parentNode.classList.remove('has_value')
    }


    _todoForm.addEventListener('submit', function(e) {

        e.preventDefault();

        let _this = this;
        let _inputWrap = this.querySelector('.ipt_wrap')
        let _input = this.querySelector('input');
        const todoInput = _input.value;
        const todoObj = {
            text: todoInput,
            id: Date.now(),
        }
        
        makingtodoList(todoObj);
        
        _input.value = "";
        classDetach(_this);
        todoArr.push(todoObj)
        saveTodoList();
        
    })

    const loginBtn = document.querySelector('.btn.btn_login');

    _loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let _this = this;
        let _inputWrap = _this.querySelector('.ipt_wrap');
        let _input = _this.querySelector('input');
        let _afterLog = document.querySelector('.afterlogin');
        let _user = _afterLog.querySelector('.user');
        const userName = _input.value;

        if(userName.length > 0 ) {

            let _loginWrap = _this.parentElement.parentElement;
            _loginWrap.classList.add('on');
            
            _user.textContent = userName;

            userId.push(userName);
            saveUserId()

        }

        
    })

    loginBtn.addEventListener('click', function(e) {

        let _this = e.target;
        let _loginForm = e.target.parentElement;
        let _inputWrap = _loginForm.querySelector('.ipt_wrap');
        let _input = _inputWrap.querySelector('.ipt');
        let _afterLog = document.querySelector('.afterlogin');
        let _user = _afterLog.querySelector('.user');

        const userName = _input.value;

        if(userName.length > 0 ) {

            let _loginWrap = _this.parentElement.parentElement.parentElement;
            _loginWrap.classList.add('on');
            
            _user.textContent = userName;
            
            userId.push(userName);
            saveUserId()

        }

    })

    const savedUser = localStorage.getItem(user_id);

    // console.log(savedUser);
    if(savedUser !== null) {
        const parsedUser = JSON.parse(savedUser);
        userId = parsedUser;
        
        if(userId.length > 0) {

            let _loginWrap = document.querySelector('.login_wrap');
            let _afterLog = document.querySelector('.afterlogin');
            let _user = _afterLog.querySelector('.user');

            _loginWrap.classList.add('on');
            _user.textContent = userId[0];

        }
    }


    function makingtodoList(todoInput) {

        let newLi = document.createElement('li');
        newLi.id = todoInput.id;
        let delBtn = document.createElement('button');

        delBtn.setAttribute('type', 'button');
        delBtn.setAttribute('title', '리스트지우기');
        delBtn.className = 'btn btn_list_del';

        newLi.textContent = todoInput.text;

        newLi.appendChild(delBtn);
        _todo.appendChild(newLi);

        delBtn.addEventListener('click', delTodoList)
    }

    function delTodoList(e) {

        let thisLi = e.target.parentNode;
        todoArr = todoArr.filter( item => item.id !== parseInt(thisLi.id));
        saveTodoList()
        thisLi.remove();
    }

    const savedTodos = localStorage.getItem(todoList_key);

    if(savedTodos !== null) {
        const parsedTodos = JSON.parse(savedTodos);
        todoArr = parsedTodos;
        parsedTodos.forEach(makingtodoList)
    }

    //탭 영역
    const _tabArea =  document.querySelector('.tab_area');
    const _tabTitleLi = _tabArea.querySelectorAll('.tab_title > ul > li');
    const _tabContsLi = _tabArea.querySelectorAll('.tab_conts > ul > li');

    for(let i = 0; i < _tabTitleLi.length; i++ ) {
        _tabTitleLi[i].addEventListener('click', function(e) {

            let thisParent = e.target.parentNode;
            let thisChild = thisParent.children;
            let thisidx = Array.from(thisChild).indexOf(e.currentTarget);
            let sbl = Array.from(thisChild).filter((item) => item !== e.currentTarget );
            let sblconts = Array.from(_tabContsLi[thisidx].parentNode.children).filter(item => item !== _tabContsLi[thisidx])

            for( let j = 0; j < sbl.length; j++) {
                sbl[j].classList.remove('active')
                sblconts[j].classList.remove('active');
                colorPicker();
            }

            if(!_tabTitleLi[thisidx].className) {

                _tabContsLi[thisidx].classList.add('active');
                _tabTitleLi[thisidx].classList.add('active');
                colorPicker();

            }
        })
    }


    // 현재 시간

    function currentTime() {

        let now = new Date();
        let thisYear = now.getFullYear();
        let thisMonth = String(now.getMonth() + 1).padStart(2, "0");
        let thisDay = String(now.getDate()).padStart(2,"0");
        let thishours = String(now.getHours()).padStart(2,"0");
        let thisMins = String(now.getMinutes()).padStart(2,"0");
        const currentTime = document.querySelector('.current_info');

        currentTime.textContent = `${thisYear}. ${thisMonth}. ${thisDay}. ${thishours} : ${thisMins}`;
    }

    currentTime()
    setInterval(currentTime, 1000);

    function colorPicker() {
        
        const _colorPicker = document.querySelector('.colorpicker');
        const _colorCheck = _colorPicker.querySelector('.board .colorcheck');
        const _colorPack = _colorPicker.querySelector('.board .colorlist');
        const _colorList = _colorPack.querySelectorAll('li');
        let newSpan = document.createElement('span');

        for( let i = 0; i < _colorList.length; i++) {

            let num1 = Math.floor(Math.random() * 255),
                num2 = Math.floor(Math.random() * 255),
                num3 = Math.floor(Math.random() * 255);

            _colorList[i].style.backgroundColor = `rgb(${num1},${num2}, ${num3})`

            _colorList[i].addEventListener('click', function() {

                let _this = this;
                let _thisStyle = _this.getAttribute('style');
                let thisBg = _thisStyle.split(":")[1].split(";")[0];
            
                newSpan.className = 'colornotice';
                newSpan.innerHTML = `background-color: <br/>${thisBg}`;

                _colorCheck.style.backgroundColor = thisBg;
                _colorCheck.appendChild(newSpan);
                
            })

        }
    }

    colorPicker();

    // 탭영역 padding값 조절
    function tabContsPadding() {
        
        const  _tabTitle =  document.querySelector('.tab_title');
        const _tabConts = document.querySelector('.tab_conts');
        
        let tabW = _tabTitle.offsetWidth;

        _tabConts.style.paddingRight = (tabW + 20) + 'px';

    }
    tabContsPadding()


})()