define({ 
  indexCurrentSelection: '1',

  onViewCreated(){
    eventManager.subscribe('selectElement', (id) => {
      const elements = this.view[`flxSelections${this.indexCurrentSelection}`].widgets();
      const numElements = elements.length;
      if(numElements === 1){
        elements[0].upSelected = false;
        elements[0].downSelected = false;
      } else {
        elements[0].upSelected = false;
        elements[0].downSelected = true;
        elements[numElements - 1].upSelected = true;
        elements[numElements - 1].downSelected = false;
      }

      if(numElements > 2){
        for(let i = 1; i < numElements - 1; i++){
          elements[i].upSelected = true;
          elements[i].downSelected = true;
        }
      }
    });

    eventManager.subscribe('moveDown', (id) => {
      const widgets = this.view[`flxSelections${this.indexCurrentSelection}`].widgets();
      const widgetData = [];
      widgets.forEach((w) => {
        w.unsubscribe();
        widgetData.push({
          title: w.title,
          image: w.image
        });
      });
      const index = widgets.findIndex((element) => element.id === id);
      const element = widgetData[index];
      const nextElement = widgetData[index + 1];
      widgetData[index] = nextElement;
      widgetData[index + 1] = element;

      this.view[`flxSelections${this.indexCurrentSelection}`].removeAll();
      let currentId;
      widgetData.forEach((widget, ind) => {
        const id = `element${new Date().getTime()}`;
        ind === index + 1 && (currentId = id);
        const cmpElement = new com.hcl.luxottica.ComponentListElement({
          id
        }, {}, {});
        cmpElement.title = widget.title;
        cmpElement.image = widget.image;
        this.view[`flxSelections${this.indexCurrentSelection}`].add(cmpElement);
      });
      eventManager.publish('selectElement', currentId);
    });

    eventManager.subscribe('moveUp', (id) => {
      const widgets = this.view[`flxSelections${this.indexCurrentSelection}`].widgets();
      const widgetData = [];
      widgets.forEach((w) => {
        w.unsubscribe();
        widgetData.push({
          title: w.title,
          image: w.image
        });
      });
      const index = widgets.findIndex((element) => element.id === id);
      const element = widgetData[index];
      const previousElement = widgetData[index - 1];
      widgetData[index] = previousElement;
      widgetData[index - 1] = element;

      this.view[`flxSelections${this.indexCurrentSelection}`].removeAll();
      let currentId;
      widgetData.forEach((widget, ind) => {
        const id = `element${new Date().getTime()}`;
        ind === index - 1 && (currentId = id);
        const cmpElement = new com.hcl.luxottica.ComponentListElement({
          id
        }, {}, {});
        cmpElement.title = widget.title;
        cmpElement.image = widget.image;
        this.view[`flxSelections${this.indexCurrentSelection}`].add(cmpElement);
      });
      eventManager.publish('selectElement', currentId);
    });
    
    eventManager.subscribe('clone', (id) => {
      const widgets = this.view[`flxSelections${this.indexCurrentSelection}`].widgets();
      const index = widgets.findIndex((element) => element.id === id);
      const widgetData = [];
      widgets.forEach((w) => {
        w.unsubscribe();
        widgetData.push({
          title: w.title,
          image: w.image
        });
        if(w.id === id){
          widgetData.push({
            title: w.title,
            image: w.image
          });
        }
      });
      this.view[`flxSelections${this.indexCurrentSelection}`].removeAll();
      let currentId;
      widgetData.forEach((widget, ind) => {
        const id = `element${new Date().getTime()}`;
        ind === index + 1 && (currentId = id);
        const cmpElement = new com.hcl.luxottica.ComponentListElement({
          id
        }, {}, {});
        cmpElement.title = widget.title;
        cmpElement.image = widget.image;
        this.view[`flxSelections${this.indexCurrentSelection}`].add(cmpElement);
      });
      eventManager.publish('selectElement', currentId);
    });

    eventManager.subscribe('bin', (id) => {
      const widgets = this.view[`flxSelections${this.indexCurrentSelection}`].widgets();
      const index = widgets.findIndex((element) => element.id === id);
      const widgetData = [];
      widgets.forEach((w) => {
        w.unsubscribe();
        if(w.id !== id){
          widgetData.push({
            title: w.title,
            image: w.image
          });
        }
      });
      this.view[`flxSelections${this.indexCurrentSelection}`].removeAll();
      this.view[`cmpNoComponents${this.indexCurrentSelection}`].isVisible = widgetData.length === 0;
      widgetData.forEach((widget, ind) => {
        const id = `element${new Date().getTime()}`;
        const cmpElement = new com.hcl.luxottica.ComponentListElement({
          id
        }, {}, {});
        cmpElement.title = widget.title;
        cmpElement.image = widget.image;
        this.view[`flxSelections${this.indexCurrentSelection}`].add(cmpElement);
      });
    });

    this.view.init = () => {
      this.manageSelectionWrapperHandlers();
      this.manageLayout();
      this.manageTileSelection();
    };
  },

  manageSelectionWrapperHandlers(){
    this.view.flxSelectionsWrapper1.onClick = () => {
      this.indexCurrentSelection = '1';

      this.view.flxSelectionsWrapper1.skin = 'skinGreyBorderBlueRounded';
      this.view.flxSelectionsWrapper1.width = '';
      this.view.flxSelectionsWrapper1.right = '120dp';
      this.view.cmpNoComponents1.isVisible = this.view.flxSelections1.widgets().length === 0;
      this.view.flxSelections1.isVisible = true;

      this.view.flxSelectionsWrapper2.skin = 'skinWhiteRounded';
      this.view.flxSelectionsWrapper2.width = '80dp';
      this.view.flxSelectionsWrapper2.left = '';
      this.view.cmpNoComponents2.isVisible = false;
      this.view.flxSelections2.isVisible = false;
    };

    this.view.flxSelectionsWrapper2.onClick = () => {
      this.indexCurrentSelection = '2';

      this.view.flxSelectionsWrapper1.skin = 'skinWhiteRounded';
      this.view.flxSelectionsWrapper1.width = '80dp';
      this.view.flxSelectionsWrapper1.right = '';
      this.view.cmpNoComponents1.isVisible = false;
      this.view.flxSelections1.isVisible = false;

      this.view.flxSelectionsWrapper2.skin = 'skinGreyBorderBlueRounded';
      this.view.flxSelectionsWrapper2.width = '';
      this.view.flxSelectionsWrapper2.left = '120dp';
      this.view.cmpNoComponents2.isVisible = this.view.flxSelections2.widgets().length === 0;
      this.view.flxSelections2.isVisible = true;
    };
  },

  manageLayout(){
    let viewHeight;

    this.view.doLayout = () => {
      viewHeight = this.view.frame.height;
      this.view.flxMain.height = `${viewHeight - 90}dp`;
    };

    this.view.flxMain.doLayout = () => {
      this.view.flxLeftShadow.height = `${viewHeight - 90}dp`;
      this.view.flxComponents.height = `${viewHeight - 100}dp`;
      this.view.flxContent.height = `${viewHeight - 100}dp`;
    };

    this.view.flxComponents.doLayout = () => {
      this.view.flxComponentsList.height = `${this.view.flxComponents.frame.height - 80}dp`;
    };

    this.view.flxContent.doLayout = () => {
      this.view.flxSelectionsWrapper1.height = `${viewHeight - 250}dp`;
      this.view.flxSelectionsWrapper2.height = `${viewHeight - 250}dp`;
    };
  },

  manageTileSelection(){
    for(let i = 1; i <= 4; i++){
      this.view[`cmpTile${i}`].onClickTile = () => {
        this.addComponentElement({
          title: this.view[`cmpTile${i}`].title,
          image: this.view[`cmpTile${i}`].image
        });
      };
    }
  },

  addComponentElement({title, image}){
    this.view[`cmpNoComponents${this.indexCurrentSelection}`].isVisible = false;
    const id = `element${new Date().getTime()}`;
    const cmpElement = new com.hcl.luxottica.ComponentListElement({
      id
    }, {}, {});
    cmpElement.title = title;
    cmpElement.image = image;
    this.view[`flxSelections${this.indexCurrentSelection}`].add(cmpElement);
    eventManager.publish('selectElement', id);
  }


});