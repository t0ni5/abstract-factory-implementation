interface MenuItem {
  getMenu(items: string[]): string
}

class BaseDropDownMenu implements MenuItem {
  getMenu(items: string[]) {
    return '';
  }
}

class GreenDropDownMenu extends BaseDropDownMenu {
  getMenu(items: string[]) {
    return `<ul style="color: green">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  }
}

class RedDropDownMenu extends BaseDropDownMenu {
  getMenu(items: string[]) {
    return `<ul style="color: red">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  }
}

interface ListItem {
  getList(items: string[]): string
}

class BaseListDownMenu implements ListItem {
  getList(items: string[]) {
    return '';
  }
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
  abstract getMenu(name: string): any;
  abstract getList(name: string): any;
}

class MenuFactory extends AbstractFactory {
  getMenu(name: string) {
    if (name === 'GREEN') {
      return new GreenDropDownMenu();
    }
    if (name === 'RED') {
      return new RedDropDownMenu();
    }
  }

  getList(_name: string): any {
    return null;
  }
}

class ListFactory extends AbstractFactory {
  getList(name: string): GreenDropDownList | RedDropDownList | undefined {
    if (name === 'GREEN') {
      return new GreenDropDownList();
    }
    if (name === 'RED') {
      return new RedDropDownList();
    }
  }

  getMenu(_name: string): null {
    return null;
  }
}

class FactoryProducer {
  static getFactory(name: string): any {
    if (name === 'MENU') {
      return new MenuFactory();
    }
    if (name === 'LIST') {
      return new ListFactory();
    }
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
