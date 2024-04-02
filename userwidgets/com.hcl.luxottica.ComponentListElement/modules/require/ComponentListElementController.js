define(function() {

  return {
    subscription: null,
    
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.subscription = eventManager.subscribe('selectElement', (id) => this.selected = this.view.id === id);
      
      this.view.onClick = () => eventManager.publish('selectElement', this.view.id);
      this.view.flxUp.onClick = () => this.upSelected && eventManager.publish('moveUp', this.view.id);
      this.view.flxDown.onClick = () => this.downSelected && eventManager.publish('moveDown', this.view.id);
      this.view.flxClone.onClick = () => eventManager.publish('clone', this.view.id);
      this.view.flxBin.onClick = () => eventManager.publish('bin', this.view.id);
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'selected', () => {
        return this._selected;
      });
      defineSetter(this, 'selected', value => {
        this._selected = value;
        this.view.flxBordered.skin = value ? 'skinBorderBlueRounded' : 'skinBorderGreyRounded';
        this.view.flxCommands.isVisible = !!value;
        this.view.flxUpDown.isVisible = !!value;
      });
      defineGetter(this, 'upSelected', () => {
        return this._upSelected;
      });
      defineSetter(this, 'upSelected', value => {
        this._upSelected = value;
        this.view.lblUp.skin = value ? 'skinMoveSelected' : 'skinMoveUnselected';
      });
      defineGetter(this, 'downSelected', () => {
        return this._downSelected;
      });
      defineSetter(this, 'downSelected', value => {
        this._downSelected = value;
        this.view.lblDown.skin = value ? 'skinMoveSelected' : 'skinMoveUnselected';
      });
    },
    
    unsubscribe(){
      this.subscription.unsubscribe();
    }
  };
});