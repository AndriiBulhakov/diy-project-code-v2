const patioSizes = {
    sizes: {
        size10x10: [10, 10],
        size11x11: [11, 11],
        size12x12: [12, 12],
        size12x16: [12, 16],
        size12x20: [12, 20],
        size12x24: [12, 24]
    },

    doCustom: false,

    size10x10: function() {
        return this.sizes.size10x10;
    },

    size11x11: function() {
        return this.sizes.size11x11;
    },

    size12x12: function() {
        return this.sizes.size12x12;
    },

    size12x16: function() {
        return this.sizes.size12x16;
    },

    size12x20: function() {
        return this.sizes.size12x20;
    },

    size12x24: function() {
        return this.sizes.size12x24;
    },

    getSize: function(sizeName) {
        if (this.sizes.hasOwnProperty(sizeName)) {
            return this.sizes[sizeName];
        } else {
            throw new Error(`Size ${sizeName} not found.`);
        }
    },

    enableCustomSizes: function() {
        this.doCustom = true;
    },

    disableCustomSizes: function() {
        this.doCustom = false;
    },

    addCustomSize: function(name, width, length) {
        if (this.doCustom) {
            this.sizes[name] = [width, length];
        } else {
            throw new Error("Custom sizes can only be added when custom sizes are enabled.");
        }
    },

    removeCustomSize: function(name) {
        if (this.doCustom && this.sizes.hasOwnProperty(name)) {
            delete this.sizes[name];
        } else {
            throw new Error(`Custom size ${name} not found or custom sizes are not enabled.`);
        }
    }
};

export default patioSizes;
