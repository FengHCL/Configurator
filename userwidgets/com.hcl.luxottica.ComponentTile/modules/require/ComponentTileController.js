define(function() {

  return {
    constructor(baseConfig, layoutConfig, pspConfig) {
      this.view.onClick = () => this.onClickTile();
    },
    
    initGettersSetters() {},

    onClickTile(){}
  };
});