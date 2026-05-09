'use client';

import { useState, useRef, useEffect } from 'react';
import './DocumentEditor.css';

interface TextElement {
  id: string;
  content: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  textDecoration: 'none' | 'underline';
}

interface DocumentEditorProps {
  letterhead: {
    company: string;
    address: string;
    phone: string;
    email: string;
  };
  onEditLetterhead: () => void;
}

interface GuideLines {
  x: number | null;
  y: number | null;
}

export default function DocumentEditor({
  letterhead,
  onEditLetterhead,
}: DocumentEditorProps) {
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontWeight, setFontWeight] = useState<'normal' | 'bold'>('normal');
  const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>('normal');
  const [textDecoration, setTextDecoration] = useState<'none' | 'underline'>(
    'none'
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggedElementId, setDraggedElementId] = useState<string | null>(null);
  const [guideLines, setGuideLines] = useState<GuideLines>({ x: null, y: null });
  const [isEditingId, setIsEditingId] = useState<string | null>(null);
  const [wasDragging, setWasDragging] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);

  // Load document from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('document');
    if (saved) {
      setTextElements(JSON.parse(saved));
    }
  }, []);

  // Save document to localStorage
  useEffect(() => {
    localStorage.setItem('document', JSON.stringify(textElements));
  }, [textElements]);

  const handleAddText = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't add text if we just finished dragging
    if (wasDragging) {
      setWasDragging(false);
      return;
    }

    if ((e.target as HTMLElement).classList.contains('text-element')) return;
    if ((e.target as HTMLElement).classList.contains('letterhead')) return;
    if ((e.target as HTMLElement).classList.contains('empty-state-hint')) return;
    if ((e.target as HTMLElement).classList.contains('drag-handle')) return;

    const rect = documentRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElement: TextElement = {
      id: Date.now().toString(),
      content: '',
      x,
      y,
      fontSize: 14,
      fontFamily: 'Arial',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
    };

    setTextElements([...textElements, newElement]);
    setSelectedId(newElement.id);
  };

  const updateElement = (id: string, updates: Partial<TextElement>) => {
    setTextElements(
      textElements.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const deleteElement = (id: string) => {
    setTextElements(textElements.filter((el) => el.id !== id));
    setSelectedId(null);
  };

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    // If this element is being edited, allow normal text editing
    if (isEditingId === elementId) {
      return;
    }
    
    // Don't prevent default on first click - let it focus the element
    // Only prevent default when we're about to drag
    const element = textElements.find((el) => el.id === elementId);
    if (!element) return;
    
    // Store initial position for potential drag
    const rect = documentRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setDragStart({
      x: e.clientX - rect.left - element.x,
      y: e.clientY - rect.top - element.y,
    });
    
    // Mark that we're ready to start a drag if mouse moves
    setDraggedElementId(elementId);
    setSelectedId(elementId);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggedElementId) return;
    
    // Don't drag if we're editing
    if (isEditingId === draggedElementId) {
      setDraggedElementId(null);
      return;
    }
    
    const rect = documentRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    const newX = currentX - dragStart.x;
    const newY = currentY - dragStart.y;
    
    // Only start actual drag if moved more than 2 pixels
    const distance = Math.sqrt(Math.pow(newX - dragStart.x, 2) + Math.pow(newY - dragStart.y, 2));
    if (distance < 2) return;
    
    setIsDragging(true);
    setWasDragging(true);
    
    // Update guide lines
    setGuideLines({
      x: newX,
      y: newY,
    });
    
    updateElement(draggedElementId, {
      x: Math.max(0, newX),
      y: Math.max(0, newY),
    });
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || draggedElementId) {
      setIsDragging(false);
      setDraggedElementId(null);
      setGuideLines({ x: null, y: null });
      // Prevent the click event from creating a new element
      e.stopPropagation();
    }
  };

  const selected = textElements.find((el) => el.id === selectedId);

  return (
    <div className="editor-container">
      <div className="toolbar">
        <div className="toolbar-section">
          <button className="btn-secondary" onClick={onEditLetterhead}>
            ✎ Edit Letterhead
          </button>
          <button
            className="btn-secondary"
            onClick={() => {
              if (
                confirm(
                  'Are you sure you want to clear the document? This cannot be undone.'
                )
              ) {
                setTextElements([]);
                setSelectedId(null);
              }
            }}
          >
            🗑 Clear
          </button>
          <button
            className="btn-secondary"
            onClick={() => window.print()}
          >
            🖨 Print
          </button>
        </div>

        {selected && (
          <div className="toolbar-section">
            <select
              value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value);
                updateElement(selectedId!, { fontFamily: e.target.value as any });
              }}
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>

            <input
              type="number"
              min="8"
              max="72"
              value={fontSize}
              onChange={(e) => {
                setFontSize(+e.target.value);
                updateElement(selectedId!, { fontSize: +e.target.value });
              }}
              placeholder="Font size"
            />

            <button
              className={fontWeight === 'bold' ? 'active' : ''}
              onClick={() => {
                const newWeight = fontWeight === 'bold' ? 'normal' : 'bold';
                setFontWeight(newWeight);
                updateElement(selectedId!, { fontWeight: newWeight });
              }}
            >
              <strong>B</strong>
            </button>

            <button
              className={fontStyle === 'italic' ? 'active' : ''}
              onClick={() => {
                const newStyle = fontStyle === 'italic' ? 'normal' : 'italic';
                setFontStyle(newStyle);
                updateElement(selectedId!, { fontStyle: newStyle });
              }}
            >
              <em>I</em>
            </button>

            <button
              className={textDecoration === 'underline' ? 'active' : ''}
              onClick={() => {
                const newDecoration =
                  textDecoration === 'underline' ? 'none' : 'underline';
                setTextDecoration(newDecoration);
                updateElement(selectedId!, { textDecoration: newDecoration });
              }}
            >
              <u>U</u>
            </button>

            <button
              className="btn-delete"
              onClick={() => deleteElement(selectedId!)}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="document" ref={documentRef} onClick={handleAddText} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        {/* Letterhead */}
        <div className="letterhead">
          <h2>{letterhead.company}</h2>
          <p className="letterhead-info">
            {letterhead.address && <span>{letterhead.address}</span>}
            {letterhead.phone && <span>{letterhead.phone}</span>}
            {letterhead.email && <span>{letterhead.email}</span>}
          </p>
        </div>

        {/* Guide Lines */}
        {isDragging && (
          <>
            {guideLines.x !== null && (
              <div className="guide-line guide-line-vertical" style={{ left: `${guideLines.x}px` }} />
            )}
            {guideLines.y !== null && (
              <div className="guide-line guide-line-horizontal" style={{ top: `${guideLines.y}px` }} />
            )}
          </>
        )}

        {/* Text Elements */}
        {textElements.map((element) => (
          <div
            key={element.id}
            className={`text-element-wrapper ${selectedId === element.id ? 'selected' : ''}`}
            style={{
              left: `${element.x}px`,
              top: `${element.y}px`,
            }}
          >
            {/* Drag Handle */}
            <div
              className="drag-handle"
              onMouseDown={(e) => {
                e.stopPropagation();
                handleMouseDown(e, element.id);
              }}
              title="Drag to move"
            >
              ⋮⋮
            </div>
            
            {/* Text Editor */}
            <div
              ref={(el) => {
                if (el && element.content && !el.textContent) {
                  el.textContent = element.content;
                }
              }}
              className="text-element"
              style={{
                fontSize: `${element.fontSize}px`,
                fontFamily: element.fontFamily,
                fontWeight: element.fontWeight,
                fontStyle: element.fontStyle,
                textDecoration: element.textDecoration,
                minHeight: '20px',
                direction: 'ltr',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(element.id);
                setFontSize(element.fontSize);
                setFontFamily(element.fontFamily);
                setFontWeight(element.fontWeight);
                setFontStyle(element.fontStyle);
                setTextDecoration(element.textDecoration);
              }}
              onFocus={() => {
                setIsEditingId(element.id);
              }}
              onBlur={(e) => {
                const text = e.currentTarget.innerText || '';
                updateElement(element.id, { content: text });
                setIsEditingId(null);
              }}
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => {
                const text = e.currentTarget.innerText || '';
                updateElement(element.id, { content: text });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Delete') {
                  e.preventDefault();
                  deleteElement(element.id);
                }
              }}
              suppressHydrationWarning
            />
          </div>
        ))}

        <div className="empty-state-hint">
          Click anywhere to add text • Drag to reposition • Format with toolbar
        </div>
      </div>
    </div>
  );
}
