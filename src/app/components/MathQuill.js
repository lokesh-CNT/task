// app/components/MathQuillBlot.js
import Quill from 'quill';

const Inline = Quill.import('blots/inline');

class MathQuillBlot extends Inline {
  static create(value) {
    const node = super.create();
    node.setAttribute('contenteditable', 'false');
    node.dataset.latex = value; // Store LaTeX value
    node.innerHTML = value; // Render LaTeX directly
    node.className = 'mathquill-latex';
    return node;
  }

  static value(node) {
    return node.dataset.latex; // Retrieve LaTeX for saving
  }
}

MathQuillBlot.blotName = 'math'; // Custom blot name
MathQuillBlot.tagName = 'span';  // Wrap with <span>
MathQuillBlot.className = 'mathquill-latex';

Quill.register(MathQuillBlot); // Register with Quill

export default MathQuillBlot;
