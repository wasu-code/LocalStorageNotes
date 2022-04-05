//focus on notefield to start typing immeditaly
document.getElementById("notebody").focus();

function saveNote() {
    var name = document.getElementById("notename").value;
    if (localStorage.getItem(name) !== null) {
        if (window.confirm("Note with that name already exist.\n⚠Do you want to overwrite it?")) {
            if (name != "") {
                var content = document.getElementById("notebody").innerHTML;
                localStorage.setItem(name, content);
                document.getElementById("noteslist").innerHTML = "Saved!";
            } else {
                window.alert("Note's name is empty");
            }
        }
    } else {
        if (name != "") {
            var content = document.getElementById("notebody").innerHTML;
            localStorage.setItem(name, content);
            document.getElementById("noteslist").innerHTML = "Saved!";
        } else {
            window.alert("Note's name is empty");
        }
    }
}

function loadNote() {
    var name = document.getElementById("notename").value;
    if (name != "") {
        if (localStorage.getItem(name) == null) {
            window.alert("No note with given name was found");
        } else {
            if (document.getElementById("notebody").innerHTML != "") {
                if (confirm("Do you want to load new note. All unsaved progress will be lost.")) {
                    var content = localStorage.getItem(name);
                    var destination = document.getElementById("notebody");
                    destination.innerHTML = content;
                }
            } else {
                var content = localStorage.getItem(name);
                var destination = document.getElementById("notebody");
                destination.innerHTML = content;
            }

        }
    } else {
        window.alert("Note's name is empty");
    }
}

function deleteNote(name) {
    if (name == null) {
        name = document.getElementById("notename").value;
    }
    if (name != "") {
        if (confirm("⚠ Do you really want to delete \"" + name + "\"?\n\nNote content: \"" + localStorage.getItem(name) + "\"")) {
            localStorage.removeItem(name);
        }
    } else {
        window.alert("Note's name is empty");
    }
}


function listNotes() {
    document.getElementById("noteslist").innerHTML = "";
    for (i = 0; i < localStorage.length; i++) {
        key = localStorage.key(i);
        var node = document.createElement('li');
        //node.appendChild(document.createTextNode(key));
        node.innerHTML = "<span onclick=\"setNamefieldValue('" + key + "')\">" + key + "</span>" + "<span onclick=\"deleteNote('" + key + "')\"> 🗑️ </span>";


        document.querySelector('ol').appendChild(node);
    }
}

function setNamefieldValue(newVal) {
    document.getElementById("notename").value = newVal;
}

function addLink() {
    var link = document.getElementById("link").value;
    if(validURL(link)) {
       link = "<a href=\"" + link + "\">[" + link + "]</a>";
        var notebody = document.getElementById("notebody").innerHTML;
        document.getElementById("notebody").innerHTML = notebody + "<br/>" + link; 
    } else {
        window.alert("Incorrectly formatted URL.\n\nTip: Remember about http://");
    }
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}


////Clicking links
document.addEventListener('keyup', disableLinkClick);
document.addEventListener('keydown', allowLinkClick);

function allowLinkClick(e) {
    if (`${e.code}` == "ControlLeft") {
        document.getElementById("notebody").contentEditable = false;
    }
    if (`${e.code}` == "AltRight") {
        document.getElementById("notebody").contentEditable = true;
        document.getElementById("notebody").focus();
    }
}

function disableLinkClick(e) {
    if (`${e.code}` == "ControlLeft") {
        document.getElementById("notebody").contentEditable = true;
        document.getElementById("notebody").focus();
    }
}