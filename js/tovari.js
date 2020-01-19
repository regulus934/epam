$(document).ready(() => {
    var butt = 1,
        butt1 = 1,
        price = 1,
        nameb = 1;
    document.getElementById('update').disabled = true;
    let store = [{
            "name": "Вареники",
            "price": "5",
            "actions": "",
            "count": "1"
        },
        {
            "name": "Арбузы",
            "price": "4",
            "actions": "",
            "count": "1"
        },
        {
            "name": "Ананас",
            "price": "6",
            "actions": "",
            "count": "1"
        }
    ];


    function GetListItem(arr) {
        let html;
        $(arr).each(function(key, item) {
            html += `
             <tr>
               <td>${item.name} <span class="badge badge-dark">${item.count}</span></td>
               <td>$ ${item.price}</td>
               <td><button type="submit" class="btn btn-dark edit" data-edit="${key}">Edit</button>  <button type="submit" class="btn btn-dark delete" data-edit="${key}">Delete</button></td>
             </tr>
       `
        });
        $('.table-hover tbody').html(html);
    }
    GetListItem();

    function SetFunct() {
        Delete();
        Edit();
        AddNew();
    }

    GetListItem(store);
    SetFunct();

    function Delete() {
        $('.delete').on('click', (e) => {
            e.preventDefault();
            let DelRow = document.querySelectorAll('.delete');
            let id = parseInt(e.target.dataset.edit);
            var confirm = alert("Вы уверены что хотите удалить товар " + store[id].name + " ?")
            if (DelRow.length == 1) {
                document.getElementById('Table').deleteRow(1);
            }
            store.splice(id, 1);
            GetListItem(store);
            SetFunct();
            Clear()

        })
    }

    function Edit() {
        $('.edit').on('click', (e) => {
            e.preventDefault();
            document.getElementById('update').disabled = false;
            let id = parseInt(e.target.dataset.edit);
            $('.ed-submit').on('click', (e) => {
                e.preventDefault();
                var jname = $('.add-name').val();
                var jprice = $('.add-price').val();
                var jcount = $('.add-count').val();
                if (jname == "" || jprice == "" || jcount == "") {
                    alert('Введите данные');
                } else {
                    store[id].name = jname;
                    store[id].price = jprice;
                    store[id].count = jcount;
                }
                GetListItem(store);
                SetFunct();
                Clear();
            })
        })
    }

    function AddNew() {
        $('.addnew').on('click', (e) => {
            e.preventDefault();
            document.getElementById('update').disabled = true;
            GetListItem(store);
            SetFunct();
            Clear();
        })
    }

    function reprice(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function AddItems() {
        var jprice = $('.add-price').val();
        var jname = $('.add-name').val();
        var jcount = $('.add-count').val();
        result = reprice(jprice);
        store.push({
            name: jname,
            price: result,
            count: jcount
        });
        GetListItem(store);
        SetFunct();
        Clear()
    }

    var sort_by = function(field, reverse, primer) {

        var key = primer ?
            function(x) {
                return primer(x[field])
            } :
            function(x) {
                return x[field]
            };

        reverse = !reverse ? 1 : -1;

        return function(a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }

    $('.add-submit').on('click', (e) => {
        var jname = $('.add-name').val();
        var jprice = $('.add-price').val();
        var jcount = $('.add-count').val();
        if (jname == "" || jprice == "" || jname == "") {
            alert('Введите данные');
        } else {
            e.preventDefault();
            AddItems();
        }
    });
    $('.sbutton').on('click', (e) => {
        e.preventDefault();
        let search = document.querySelector('.stext').value;
        if (search == "") {
            GetListItem(store);
        } else {
            let result = store.filter(e => e.name == search);
            GetListItem(result);
        }
        Clear();
        Delete();
        Edit();
        AddNew();
    })
    $('.sortname').on('click', (e) => {
        parseInt
        e.preventDefault();
        nameb *= -1;
        store.sort(sort_by('name', nameb == -1, function(a) {
            return a.toUpperCase()
        }));
        butt *= -1;
        if (butt == -1) {
            document.getElementById('sort-name').innerHTML = "△";
        }
        if (butt == 1) {
            document.getElementById('sort-name').innerHTML = "▽";
        }
        GetListItem(store);
    })
    $('.sortprice').on('click', (e) => {
        e.preventDefault();
        price *= -1;
        store.sort(function(a, b) {
            if (price == -1) {
                return a.price - b.price
            };
            if (price == 1) {
                return b.price - a.price
            };
        });
        butt1 *= -1;
        if (butt1 == -1) {
            document.getElementById('sort-price').innerHTML = "△";
        }
        if (butt1 == 1) {
            document.getElementById('sort-price').innerHTML = "▽";
        }
        GetListItem(store);
    });

    function Clear() {
        document.querySelector('.add-name').value = '';
        document.querySelector('.add-count').value = '';
        document.querySelector('.add-price').value = '';
        document.querySelector('.stext').value = '';
    }
    $(document).ready(function() {
        $(".validation").keydown(function(event) {
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
                (event.keyCode == 65 && event.ctrlKey === true) ||
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                return;
            } else {
                if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                }
            }
        });
    });

    $(document).ready(function() {
        $(".add-name").keydown(function(event) {
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
                (event.keyCode == 65 && event.ctrlKey === true) ||
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                return;
            } else {
                if (event.keyCode == 32) {
                    event.preventDefault();
                }
            }
        });
    });
})
