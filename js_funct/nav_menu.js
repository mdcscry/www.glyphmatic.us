/**
 * Navigation Menu Controller
 * Manages the slide-out control panel and all user interactions
 */

class NavMenu {

    constructor(insertIndex, colors) {
        this.insertIndex = insertIndex;
        this.colors = colors || [];
        this.config = getInsertConfig(insertIndex);
        this.isOpen = false;
        this.elements = {};
        
        this.init();
    }
    
    /**
     * Initialize the navigation menu
     */
    init() {
        // Check if any controls are enabled
        const anyEnabled = Object.values(this.config.controls).some(val => val === true);
        
        if (!anyEnabled) {
            console.log('All controls disabled for insert', this.insertIndex, '- skipping nav menu creation');
            return;
        }
        
        // Clean up any existing nav elements first
        this.cleanup();
        this.createSlideOutPanel();
        this.createControls();
        this.applyControlVisibility();
        this.createDescription();
        this.applyRandomMenuFont();
    }
    
    /**
     * Clean up existing navigation elements
     */
    cleanup() {
        const existingPanel = document.getElementById('navPanel');
        const existingTab = document.getElementById('navTabContainer');
        if (existingPanel) existingPanel.remove();
        if (existingTab) existingTab.remove();
    }
    
    /**
     * Create the slide-out panel container and toggle tab
     */
    createSlideOutPanel() {
        // Container for the panel
        const panel = document.createElement('div');
        panel.id = 'navPanel';
        panel.style.cssText = `
            position: fixed !important;
            right: -200px !important;
            top: 0 !important;
            left: auto !important;
            bottom: auto !important;
            width: 200px !important;
            height: 100vh !important;
            background: rgba(0, 0, 0, 1) !important;
            transition: right 0.3s ease !important;
            z-index: 2147483647 !important;
            padding: 15px 10px 15px 10px !important;
            box-sizing: border-box !important;
            pointer-events: auto !important;
            overflow-y: auto !important;
            isolation: isolate !important;
            transform: translateZ(0) !important;
            will-change: transform !important;
        `;
        panel.style.fontFamily = 'Arial, sans-serif'; // Set a default that can be overridden
        document.body.appendChild(panel);
        this.elements.panel = panel;
        
        // Add CSS protection against insert's global DIV rules
        const navProtection = document.createElement('style');
        navProtection.textContent = `
            #navPanel, #navPanel *, #navPanel div, #navPanel div.display, #navPanel div.noDisplay,
            #navTab, #navTabContainer {
                font-size: 14px !important;
                line-height: 20px !important; /* font-family removed from here */
                animation: none !important;
                opacity: 1 !important;
                visibility: visible !important;
            }
            #navPanel {
                text-align: left !important;
            }
            #navPanel > div {
                margin: 0 0 12px 0 !important;
                padding: 6px 8px !important;
                text-align: left !important;
                background: transparent !important;
                border-radius: 0 !important;
                clear: both !important;
                width: 100% !important;
                box-sizing: border-box !important;
                position: relative !important;
                top: auto !important;
                left: auto !important;
                height: auto !important;
            }
        `;
        document.head.appendChild(navProtection);
        
        // Toggle tab - create an isolation container first
        const tabContainer = document.createElement('div');
        tabContainer.id = 'navTabContainer';
        tabContainer.style.cssText = `
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            pointer-events: none !important;
            z-index: 2147483647 !important;
            isolation: isolate !important;
        `;
        document.body.appendChild(tabContainer);
        
        const tab = document.createElement('div');
        tab.id = 'navTab';
        tab.innerHTML = '◀';
        tab.style.cssText = `
            position: absolute !important;
            left: calc(100vw - 30px) !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            width: 30px !important;
            height: 60px !important;
            background: rgba(0, 0, 0, 0.9) !important;
            color: #ffffff !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            font-size: 20px !important;
            transition: left 0.3s ease !important;
            border-radius: 5px 0 0 5px !important;
            pointer-events: auto !important;
            will-change: left !important;
            isolation: isolate !important;
        `;
        tab.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });
        tabContainer.appendChild(tab);
        this.elements.tab = tab;
        
        console.log('Tab created:', tab);
        console.log('Tab styles:', tab.style.cssText);
        
        // Keep checking that tab stays visible
        setInterval(() => {
            if (tab.style.display === 'none' || tab.style.visibility === 'hidden') {
                console.warn('Tab was hidden! Restoring...');
                tab.style.setProperty('display', 'flex', 'important');
                tab.style.setProperty('visibility', 'visible', 'important');
            }
            if (!tabContainer.contains(tab)) {
                console.warn('Tab was removed! Re-adding...');
                tabContainer.appendChild(tab);
            }
        }, 100);
    }
    
    /**
     * Toggle panel open/closed
     */
    toggle() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.elements.panel.style.setProperty('right', '0', 'important');
            this.elements.tab.style.setProperty('left', 'calc(100vw - 230px)', 'important');
            this.elements.tab.innerHTML = '▶';
        } else {
            this.elements.panel.style.setProperty('right', '-200px', 'important');
            this.elements.tab.style.setProperty('left', 'calc(100vw - 30px)', 'important');
            this.elements.tab.innerHTML = '◀';
        }
    }
    
    /**
     * Create all control buttons
     */
    createControls() {
        const controls = [
            {
                id: 'styleBtn',
                label: '△ STYLE',
                controlName: 'style',
                handler: () => this.handleStyleChange()
            },
            {
                id: 'htmlBtn',
                label: '△ HTML',
                controlName: 'html',
                handler: () => this.handleHtmlToggle()
            },
            {
                id: 'moveUpBtn',
                label: '⊼ MOVE UP',
                controlName: 'moveUpDown',
                handler: () => this.handleMoveUp()
            },
            {
                id: 'moveDownBtn',
                label: '⊻ MOVE DOWN',
                controlName: 'moveUpDown',
                handler: () => this.handleMoveDown()
            },
            {
                id: 'sizeUpBtn',
                label: '+ SIZE UP',
                controlName: 'resize',
                handler: () => this.handleResize(1.1)
            },
            {
                id: 'sizeDownBtn',
                label: '− SIZE DOWN',
                controlName: 'resize',
                handler: () => this.handleResize(0.9)
            }
        ];
        
        controls.forEach(ctrl => {
            const btn = this.createButton(ctrl.id, ctrl.label, ctrl.handler);
            btn.dataset.controlName = ctrl.controlName;
            this.elements.panel.appendChild(btn);
            this.elements[ctrl.id] = btn;
        });
    }
    
    /**
     * Create a styled button
     */
    createButton(id, label, handler) {
        const btn = document.createElement('div');
        btn.id = id;
        
        // Wrap label in span with isolated styles
        const span = document.createElement('span');
        span.textContent = label;
        span.style.cssText = ` /* font-family removed from here */
            font-size: 14px !important;
            line-height: 14px !important;
            color: rgb(255, 255, 255) !important;
            display: inline-block !important;
        `;
        btn.appendChild(span);
        
        btn.style.cssText = `
            position: relative !important;
            display: block !important;
            height: 22px !important;
            max-height: 22px !important;
            min-height: 22px !important;
            margin: 0 0 8px 0 !important;
            padding: 4px 8px !important;
            cursor: pointer !important;
            user-select: none !important;
            width: auto !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            background: transparent !important;
        `;
        btn.addEventListener('click', handler);
        return btn;
    }
    
    /**
     * Create description element at the bottom of the panel
     */
    createDescription() {
        if (!this.config.description) return;

        const descDiv = document.createElement('div');
        descDiv.id = 'insertDescription';
        descDiv.style.cssText = `
            position: relative !important;
            display: block !important;
            margin: 50px 0 0 0 !important;
            padding: 8px !important;
            font-size: 12px !important;
            line-height: 16px !important;
            color: #ffffff !important;
            background: transparent !important;
            border: none !important;
            border-radius: 0 !important;
            text-align: left !important;
            word-wrap: break-word !important;
            box-sizing: border-box !important;
        `;
        descDiv.textContent = this.config.description;

        // Insert at the end of the panel (after controls)
        this.elements.panel.appendChild(descDiv);
        this.elements.description = descDiv;
    }

    /**
     * Apply visibility based on config
     */
    applyControlVisibility() {
        console.log('=== Applying control visibility for insert', this.insertIndex, '===');
        console.log('Config:', this.config.controls);
        console.log('Elements in this.elements:', Object.keys(this.elements));
        
        Object.keys(this.elements).forEach(key => {
            const element = this.elements[key];
            console.log(`Element ${key}:`, element.id, 'has dataset?', !!element.dataset);
            
            if (element.dataset && element.dataset.controlName) {
                const controlName = element.dataset.controlName;
                const isEnabled = this.config.controls[controlName];
                console.log(`  -> Control ${controlName}: isEnabled=${isEnabled}, setting display to ${isEnabled ? 'block' : 'none'}`);
                element.style.display = isEnabled ? 'block' : 'none';
                console.log(`  -> After setting, display is: ${element.style.display}`);
            }
        });
        
        // Also check what's actually in the DOM
        console.log('=== DOM Check ===');
        const allButtons = document.querySelectorAll('#navPanel > div');
        console.log('Buttons found in panel:', allButtons.length);
        allButtons.forEach(btn => {
            console.log(`  Button ${btn.id}: display=${btn.style.display}, dataset.controlName=${btn.dataset.controlName}`);
        });
    }
    
    /**
     * Handle style change
     */
    handleStyleChange() {
        if (typeof initStyle === 'function') {
            // Reset colors
            mycolors = [];
            initStyle();
        }
    }
    
    /**
     * Handle HTML display toggle
     */
    handleHtmlToggle() {
        if (typeof changeHtmlDisplayInline === 'function') {
            changeHtmlDisplayInline();
        }
    }
    

    /*** Handle move up*/

    handleMoveUp() {
        if (this.insertIndex === 8 || this.insertIndex === 9 || this.insertIndex === 10) {
            if (typeof divCounter === 'undefined' || typeof container === 'undefined') {
                return;
            }
            
            for (let i = 1; i <= divCounter; i++) {
                const computed = window.getComputedStyle(container[i]);
                let currentTop = parseFloat(computed.top);
                
                // If top is auto or NaN, start from 0
                if (isNaN(currentTop)) {
                    currentTop = 0;
                }
                
                // Move up by 5vh (5% of viewport height)
                const viewportHeight = window.innerHeight;
                const moveAmount = viewportHeight * 0.05; // 5vh in pixels
                const newTop = currentTop - moveAmount;
                
                // Disable transition for immediate movement
                container[i].style.transition = 'none';
                container[i].style.top = newTop + 'px';
                
                // Re-enable transitions after a brief delay
                setTimeout(() => {
                    container[i].style.transition = '';
                }, 50);
            }
            return;
        }
        
        // Original line-height logic for other inserts
        if (typeof divCounter === 'undefined' || typeof container === 'undefined') {
            return;
        }
        
        for (let i = 1; i <= divCounter; i++) {
            const computed = window.getComputedStyle(container[i]);
            let currentLineHeight = parseFloat(computed.lineHeight);
            
            // If lineHeight is 'normal' or NaN, use fontSize as baseline
            if (isNaN(currentLineHeight)) {
                currentLineHeight = parseFloat(computed.fontSize) * 1.2;
            }
            
            const viewportWidth = window.innerWidth;
            const currentVw = (currentLineHeight / viewportWidth) * 100;
            const newVw = currentVw - 2; // Decrease by 2vw each click
            container[i].style.lineHeight = newVw + 'vw';
        }
    }

    /**
     * Handle move down
     */
    handleMoveDown() {
        // Insert 8, 9, 10 (mandala): move containers down in viewport
    if (this.insertIndex === 8 || this.insertIndex === 9 || this.insertIndex === 10) {
        if (typeof divCounter === 'undefined' || typeof container === 'undefined') {
            return;
        }
        
        for (let i = 1; i <= divCounter; i++) {
            const computed = window.getComputedStyle(container[i]);
            let currentTop = parseFloat(computed.top);
            
            // If top is auto or NaN, start from 0
            if (isNaN(currentTop)) {
                currentTop = 0;
            }
            
            // Move down by 5vh (5% of viewport height)
            const viewportHeight = window.innerHeight;
            const moveAmount = viewportHeight * 0.05; // 5vh in pixels
            const newTop = currentTop + moveAmount;
            
            // Disable transition for immediate movement
            container[i].style.transition = 'none';
            container[i].style.top = newTop + 'px';
            
            // Re-enable transitions after a brief delay
            setTimeout(() => {
                container[i].style.transition = '';
            }, 50);
        }
        return;
    }
        
        // Original line-height logic for other inserts
        if (typeof divCounter === 'undefined' || typeof container === 'undefined') {
            return;
        }
        
        for (let i = 1; i <= divCounter; i++) {
            const computed = window.getComputedStyle(container[i]);
            let currentLineHeight = parseFloat(computed.lineHeight);
            
            // If lineHeight is 'normal' or NaN, use fontSize as baseline
            if (isNaN(currentLineHeight)) {
                currentLineHeight = parseFloat(computed.fontSize) * 1.2;
            }
            
            const viewportWidth = window.innerWidth;
            const currentVw = (currentLineHeight / viewportWidth) * 100;
            const newVw = currentVw + 2; // Increase by 2vw each click
            container[i].style.lineHeight = newVw + 'vw';
        }
    }

    /*** Handle resize*/

    handleResize(factor) {
        // Insert 8, 9, 10 (mandala): resize using vmin units
        if (this.insertIndex === 8 || this.insertIndex === 9 || this.insertIndex === 10) {
            if (typeof divCounter === 'undefined' || typeof container === 'undefined') {
                return;
            }
            
            for (let i = 1; i <= divCounter; i++) {
                const computed = window.getComputedStyle(container[i]);
                const currentSize = parseFloat(computed.fontSize);
                const viewportMin = Math.min(window.innerWidth, window.innerHeight);
                const currentVmin = (currentSize / viewportMin) * 100;
                const newVmin = currentVmin * factor;
                
                // Disable transition for immediate resize
                container[i].style.transition = 'none';
                container[i].style.fontSize = newVmin + 'vmin';
                
                // Re-enable transitions after a brief delay
                setTimeout(() => {
                    container[i].style.transition = '';
                }, 50);
            }
            return;
        }
        
        // Check for insert13's strip arrays first
        if (typeof hStrips !== 'undefined' && typeof vStrips !== 'undefined' && hStrips.length > 0) {
            // Insert13 (Braided Marquee): resize cells in strips
            const allStrips = [...hStrips, ...vStrips];
            allStrips.forEach(strip => {
                const cells = strip.getElementsByTagName('div');
                for (let i = 0; i < cells.length; i++) {
                    if (cells[i].style.fontSize) {
                        const currentSize = parseFloat(cells[i].style.fontSize);
                        if (!isNaN(currentSize)) {
                            const unit = cells[i].style.fontSize.replace(/[\d.]/g, '');
                            cells[i].style.fontSize = (currentSize * factor) + unit;
                        }
                    }
                }
            });
            return;
        }
        
        if (typeof divCounter === 'undefined' || typeof container === 'undefined') {
            return;
        }
        
        for (let i = 1; i <= divCounter; i++) {
            // Check if this insert uses spans for font sizing (like insert12)
            const spans = container[i].getElementsByTagName('span');
            
            if (spans.length > 0 && spans[0].style.fontSize) {
                // Insert12+ style: resize spans with vw units
                for (let j = 0; j < spans.length; j++) {
                    const current = parseFloat(spans[j].style.fontSize);
                    spans[j].style.fontSize = (current * factor) + 'vw';
                }
            } else {
                // Check for cells/divs with inline fontSize (insert13 style)
                const cells = container[i].getElementsByTagName('div');
                let foundCells = false;
                
                for (let j = 0; j < cells.length; j++) {
                    if (cells[j].style.fontSize) {
                        const currentSize = parseFloat(cells[j].style.fontSize);
                        if (!isNaN(currentSize)) {
                            // Preserve the original unit (vmin, vw, px, etc)
                            const unit = cells[j].style.fontSize.replace(/[\d.]/g, '');
                            cells[j].style.fontSize = (currentSize * factor) + unit;
                            foundCells = true;
                        }
                    }
                }
                
                // If no cells found, fall back to container method (insert0-3)
                if (!foundCells) {
                    const computed = window.getComputedStyle(container[i]);
                    const currentSize = parseFloat(computed.fontSize);
                    const newSize = currentSize * factor;
                    container[i].style.setProperty('font-size', newSize + 'px', 'important');
                }
            }
        }
    }
        
        /**
         * Get navigation color from color array
         */
        getNavColor() {
            if (this.colors.length === 0) return '#ffffff';
            return this.colors[Math.floor(Math.random() * this.colors.length)];
        }
        
        /**
         * Get random color from color array
         */
        getRandomColor() {
            if (this.colors.length === 0) return '#000000';
            return this.colors[Math.floor(Math.random() * this.colors.length)];
        }
    
    /**
     * Applies a random monospace font to the menu using FontUtility.
     */
    applyRandomMenuFont() {
        if (typeof FontUtility === 'undefined') {
            console.error('FontUtility is not loaded. Cannot apply random menu font.');
            return;
        }

        // Load monospace fonts (does nothing if already loaded)
        FontUtility.loadMonospaceFonts();

        // Get a random monospace font from the hardcoded list
        const randomFont = FontUtility.getRandomMonospaceFont();

        if (randomFont) {
            const fontCss = randomFont.includes(' ') ? `"${randomFont}"` : randomFont;
            console.log('Applying font to nav menu:', fontCss);

            // Apply to panel with !important to override any conflicting styles
            if (this.elements.panel) {
                this.elements.panel.style.setProperty('font-family', fontCss, 'important');
            }
            if (this.elements.tab) {
                this.elements.tab.style.setProperty('font-family', fontCss, 'important');
            }

            // Also apply to all buttons/spans in the panel
            const allElements = this.elements.panel.querySelectorAll('div, span');
            allElements.forEach(el => {
                el.style.setProperty('font-family', fontCss, 'important');
            });
        }
    }
    }

    /**
     * Initialize navigation menu
     * Call this from your main script after colors are set
     */
    function initNavMenu(insertIndex, colors) {
        return new NavMenu(insertIndex, colors);
    }