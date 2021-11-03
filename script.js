/*
    Assignment 5
    James Wright
*/

$(document).ready(function(){
    // your code here

    let fish = new Array(
        {   
            id: 0, 
            title: "Smallmouth Bass", 
            desc: "A Bass with vertical stripes and a brown/bronze colouring.",
            cat: "Bass"
        },
        {
            id: 1,
            title: "Largemouth Bass",
            desc: "A bass with a black lateral line down the side of it with a green colour on the back and a green-white belly.",
            cat: "Bass"
        },
        {
            id: 2,
            title: "Northern Pike",
            desc: "A long slim fish with a pointed head and sharp teeth, has light spots on a dark back and a light underbody.",
            cat: "Pike"
        },
        {
            id: 3,
            title: "Walleye",
            desc: "A grey / silver coloured fish that is slim and has sharp teeth",
            cat: "Pickrel"
        },
        {
            id: 4,
            title: "Silver Bass",
            desc: "A small silver in colour bass with black dotted lines down its side.",
            cat: "Bass"
        }
    );

    class ContentCard{
        id;
        title;
        desc;
        cat;

        constructor(id, title, desc, cat){
            this.id = id;
            this.title = title;
            this.desc = desc;
            this.cat = cat;
        }

        updateContent(title, desc, cat){
            if(title != null){
                $(`#content-${this.id} h4`).text(this.title);
            }

            if(desc != null){
                $(`#content-${this.id} p`).text(this.desc);
            }
            
            if(cat != null){
                $(`#content-${this.id} div`).text(this.cat);
            }
        }

        toString(){
            $(`#content-list`).append(`<div id='content-${this.id}' style='border: 1px solid black; padding: 5px; margin: 5px;'></div>`);
            $(`#content-${this.id}`).append(`<h4>${this.title}</h4>`);
            $(`#content-${this.id}`).append(`<p>${this.desc}</p>`);
            $(`#content-${this.id}`).append(`<div>Category: ${this.cat}</div>`);
        }
    }

    let fishArr = new Array();

    fish.forEach(element => {
        fishArr.push(new ContentCard(element.id, element.title, element.desc, element.cat));
    });
    
    fishArr.forEach(element => {
        element.toString();
    });
});


