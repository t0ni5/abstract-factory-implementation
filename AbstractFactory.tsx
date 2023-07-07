/* eslint-disable class-methods-use-this */
interface MenuItem {
  getMenu(items: string[]): string
}

class GreenDropDownMenu implements MenuItem {
  getMenu(items: string[]) {
    return `<ul style="color: green">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  }
}

class RedDropDownMenu implements MenuItem {
  getMenu(items: string[]) {
    return `<ul style="color: red">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  }
}

interface ListItem {
  getList(items: string[]): string
}

class GreenDropDownList implements ListItem {
  getList(items: string[]) {
    return `<select style="color: green" name="select"> 
    ${items.map((item) => `<option value=${item}> ${item}`).join('')}</select>`;
  }
}

class RedDropDownList implements ListItem {
  getList(items: string[]) {
    return `<select style="color: red" name="select"> 
    ${items.map((item) => `<option value=${item}> ${item}`).join('')}</select>`;
  }
}

abstract class AbstractFactory {
  abstract getMenu(name: string): MenuItem ;
  abstract getList(name: string): ListItem ;
}

class MenuFactory extends AbstractFactory {
  getMenu(name: string) {
    if (name === 'GREEN') {
      return new GreenDropDownMenu();
    }
    if (name === 'RED') {
      return new RedDropDownMenu();
    }
    return new RedDropDownMenu();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getList(name: string) {
    return new GreenDropDownList();
  }
}

class ListFactory extends AbstractFactory {
  getList(name: string) {
    if (name === 'GREEN') {
      return new GreenDropDownList();
    }
    if (name === 'RED') {
      return new RedDropDownList();
    }
    return new RedDropDownList();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMenu(name: string) {
    return new GreenDropDownMenu();
  }
}

class FactoryProducer {
  static getFactory(name: string): AbstractFactory {
    if (name === 'MENU') {
      return new MenuFactory();
    }
    if (name === 'LIST') {
      return new ListFactory();
    }
    return new MenuFactory();
  }
}

const greenMenuProducer: AbstractFactory = FactoryProducer.getFactory('MENU');
const greenMenu: MenuItem = greenMenuProducer.getMenu('GREEN');

const redMenuProducer: AbstractFactory = FactoryProducer.getFactory('MENU');
const redMenu: MenuItem = redMenuProducer.getMenu('RED');

const redListProducer: AbstractFactory = FactoryProducer.getFactory('LIST');
const redList: ListItem = redListProducer.getList('RED');

const greenListProducer: AbstractFactory = FactoryProducer.getFactory('LIST');
const greenList: ListItem = greenListProducer.getList('GREEN');

const factoryDiv = document.querySelector('.factory') as HTMLElement;
factoryDiv.innerHTML += greenMenu.getMenu(['1', '2', '3']);
factoryDiv.innerHTML += redMenu.getMenu(['value 1', 'value 2', 'value 3']);
factoryDiv.innerHTML += redList.getList(['1', '2', '3', '4']);
factoryDiv.innerHTML += greenList.getList(['one', 'two', 'three']);
