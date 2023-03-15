export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        try {
            this.oldOfficer = document.querySelector(oldOfficer);
            this.newOfficer = document.querySelector(newOfficer);
            this.oldItems = this.oldOfficer.querySelectorAll(items);
            this.newItems = this.newOfficer.querySelectorAll(items);
            this.oldCounter = 0;
            this.newCounter = 0;
        } catch (e) {}
    }

    bindTriggers() {
        const bind = (officer, counter, items) => {
            officer.querySelector('.plus').addEventListener('click', () => {
                if (counter !== items.length - 2) {
                    items[counter].style.display = 'flex';
                    counter++;
                } else {
                    items[counter].style.display = 'flex';
                    items[items.length - 1].remove();
                }
            });
        };

        bind(this.oldOfficer, this.oldCounter, this.oldItems);
        bind(this.newOfficer, this.newCounter, this.newItems);
    }

    hideItems() {
        const hide = (items) => { 
                items.forEach((item, i, arr) => {
                if (i !== arr.length - 1) {
                    item.style.display = 'none';
                }
            });
        };

        hide(this.oldItems);
        hide(this.newItems);
    }

    init() {
        try {
            this.hideItems();
            this.bindTriggers();
        } catch (e) {}
    }
}