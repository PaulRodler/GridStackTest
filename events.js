function addEvents(gridEv, id) {
    const ID = id;
    let g = (id !== undefined ? 'grid' + id + ' ' : '');

    gridEv.on('added removed change', function(event, items) {
        let str = '';
        items.forEach(function(item) { str += ' (' + item.x + ',' + item.y + ' ' + item.w + 'x' + item.h + ')'; });
        console.log(g + event.type + ' ' + items.length + ' items (x,y w h):' + str );
    });

    gridEv.on('disable', function(event) {
        let grid = event.target;
        console.log(g + 'disable');
    });

    gridEv.on('dragstart', function(event, el) {
        let node = el.gridstackNode;
        let x = el.getAttribute('gs-x');
        let y= el.getAttribute('gs-y');
        if(ID === 1){
            node.w = 2;
            node.h = 1;
            node.noResize = false;
        }
        console.log(g + 'dragstart ' + el.textContent + ' pos: (' + node.x + ',' + node.y + ') vs (' + x + ',' + y + ')');
    });

    gridEv.on('dragstop', function(event, el) {
        let node = el.gridstackNode;
        let x = el.getAttribute('gs-x');
        let y= el.getAttribute('gs-y');
        if(ID === 1){
            var added = el;
            added.setAttribute('gs-w', 12);
            added.setAttribute('gs-h', 3);
            added.setAttribute('noResize', true);
            grid[ID].removeWidget(el);
            grid[ID].addWidget(added);
            hardReload(ID);
        }

        console.log(g + 'dragstop ' + el.textContent + ' pos: (' + node.x + ',' + node.y + ') vs (' + x + ',' + y + ')');
        console.log(grid[ID].save());
    });

    gridEv.on('dropped', function(event, previousWidget, newWidget) {
        if (previousWidget) {
            console.log(g + 'dropped - Removed widget from grid:', previousWidget);
        }
        if (newWidget) {
            var added = grid[ID].getGridItems()[grid[ID].getGridItems().length-1]
            if(ID === 1){
                added.setAttribute('gs-w', 12);
                added.setAttribute('gs-h', 3);
                added.setAttribute('noResize', true);
                grid[ID].removeWidget(grid[ID].getGridItems()[grid[ID].getGridItems().length-1]);
                grid[ID].addWidget(added);
                hardReload(ID);
            }
            if(ID === 0 && added.id === 'prompt'){
                console.log('elm with: '+ added.id);
                var lastElm = $('.grid-main').children()[$('.grid-main').children().length -1];
                console.log(lastElm.children[0].innerHTML = prompt('Benutzerdefiniertes Feld','Custom'));
            }
            console.log(g + 'dropped - Added widget in grid:', newWidget);

        }
    });

    gridEv.on('enable', function(event) {
        let grid = event.target;
        console.log(g + 'enable');
    });

    gridEv.on('resizestart', function(event, el) {
        let w = el.getAttribute('gs-w');
        let h = el.getAttribute('gs-h');
        console.log(g + 'resizestart ' + el.textContent + ' size: (' + w + ' x ' + h + ')');
    });

    gridEv.on('resizestop', function(event, el) {
        let w = el.getAttribute('gs-w');
        let h = el.getAttribute('gs-h');
        console.log(g + 'resizestop ' + el.textContent + ' size: (' + w + ' x ' + h + ')');
    });
}
