export class UI {
  constructor(game) {
    this.game = game;
    this.inventory = [];
    this.selectedBlock = 'grass';
    this.inventoryElement = document.getElementById('inventory');
    this.initInventory();
  }

  initInventory() {
    const blocks = ['grass', 'dirt', 'stone', 'wood', 'water'];
    blocks.forEach(block => {
      const slot = document.createElement('div');
      slot.className = 'w-12 h-12 bg-gray-700 border border-gray-500 rounded flex items-center justify-center cursor-pointer hover:bg-gray-600';
      slot.textContent = block;
      slot.addEventListener('click', () => {
        this.selectedBlock = block;
        this.highlightSelected(slot);
      });
      this.inventoryElement.appendChild(slot);
    });
  }

  highlightSelected(selectedSlot) {
    Array.from(this.inventoryElement.children).forEach(child => {
      child.classList.remove('bg-green-600');
    });
    selectedSlot.classList.add('bg-green-600');
  }
}
