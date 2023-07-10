interface MenuItem {
  items: string[]
  getMenu(items: string[]): string
}

class GreenDropDownMenu implements MenuItem {
  items: string[];

  constructor() {
    this.items = [];
  }

  getMenu(items: string[]) {
    this.items = items;
    return `<ul style="color: green">${this.items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  }
}

class RedDropDownMenu implements MenuItem {
  items: string[];

  constructor() {
    this.items = [];
  }

  getMenu(items: string[]) {
    this.items = items;
    return `<ul style="color: red">${this.items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  }
}

interface ListItem {
  items: string[]
  getList(items: string[]): string
}

class GreenDropDownList implements ListItem {
  items: string[];

  constructor() {
    this.items = [];
  }

  getList(items: string[]) {
    this.items = items;
    return `<select style="color: green" name="select"> 
    ${this.items.map((item) => `<option value=${item}> ${item}`).join('')}</select>`;
  }
}

class RedDropDownList implements ListItem {
  items: string[];

  constructor() {
    this.items = [];
  }

  getList(items: string[]) {
    this.items = items;
    return `<select style="color: red" name="select"> 
    ${this.items.map((item) => `<option value=${item}> ${item}`).join('')}</select>`;
  }
}

interface AbstractFactory {
  menuFactory : MenuFactory;
  listFactory : ListFactory;
  create<T>(element: T): T;
}

interface Menu {
  greenDropDownMenu :GreenDropDownMenu;
  redDropDownMenu : RedDropDownMenu;

  getMenu(name: string): MenuItem
}

class MenuFactory implements Menu {
  greenDropDownMenu :GreenDropDownMenu;

  redDropDownMenu : RedDropDownMenu;

  constructor() {
    this.greenDropDownMenu = new GreenDropDownMenu();
    this.redDropDownMenu = new RedDropDownMenu();
  }

  getMenu(name: string) {
    if (name === 'GREEN') {
      return this.greenDropDownMenu;
    }
    if (name === 'RED') {
      return this.redDropDownMenu;
    }
    throw new Error('Invalid factory type');
  }
}

interface List {
  greenDropDownList :GreenDropDownList ;
  redDropDownList : RedDropDownList ;
  getList(name: string): ListItem
}

class ListFactory implements List {
  greenDropDownList :GreenDropDownList;

  redDropDownList : RedDropDownList;

  constructor() {
    this.greenDropDownList = new GreenDropDownList();
    this.redDropDownList = new RedDropDownList();
  }

  getList(name: string) {
    if (name === 'GREEN') {
      return this.greenDropDownList;
    }
    if (name === 'RED') {
      return this.redDropDownList;
    }
    throw new Error('Invalid factory type');
  }
}

class FactoryProducer implements AbstractFactory {
  menuFactory : MenuFactory;

  listFactory : ListFactory;

  constructor() {
    this.menuFactory = new MenuFactory();
    this.listFactory = new ListFactory();
  }

  create<T>(element: T): T {
    if (element instanceof MenuFactory) {
      return this.menuFactory as T;
    }

    if (element instanceof ListFactory) {
      return this.listFactory as T;
    }
    throw new Error('Invalid factory type');
  }
}

const factoryProducer: FactoryProducer = new FactoryProducer();

const menuFactory: Menu = factoryProducer.create(new MenuFactory());

const greenMenu: MenuItem = menuFactory.getMenu('GREEN');
const redMenu: MenuItem = menuFactory.getMenu('RED');

const listFactory: List = factoryProducer.create(new ListFactory());

const redList: ListItem = listFactory.getList('RED');
const greenList: ListItem = listFactory.getList('GREEN');

const factoryDiv = document.querySelector('.factory') as HTMLElement;
factoryDiv.innerHTML += greenMenu.getMenu(['1', '2', '3']);
factoryDiv.innerHTML += redMenu.getMenu(['value 1', 'value 2', 'value 3']);
factoryDiv.innerHTML += redList.getList(['1', '2', '3', '4']);
factoryDiv.innerHTML += greenList.getList(['one', 'two', 'three']);
