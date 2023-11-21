import React, { useState, useEffect } from 'react';
import MyEditor from './MyEidtor';
import { BiText } from 'react-icons/bi';

export default function EmailEditor() {
  const [isMyEditorVisible, setMyEditorVisible] = useState(false);
  const [dropPosition, setDropPosition] = useState({ x: null, y: null });

  const available_form_elements = [
    {
      id: 'input_text',
      element: (
        <div
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('id', 'input_text');
          }}
        >
          <BiText />
        </div>
      ),
    },
    {
      id: 'input_file',
      element: <input className="input_file" type="file" />,
    },
  ];

  const [selected_form_elements, setSelectedFormElements] = useState([]);

  useEffect(() => {
    if (selected_form_elements.length > 0) {
      setMyEditorVisible(true);
    }
  }, [selected_form_elements]);

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData('id', id);
  };

  const onDrop = (event, target) => {
    const id = event.dataTransfer.getData('id');

    if (id === 'input_text') {
      const updatedSelectedFormElements = [...selected_form_elements];

      available_form_elements.forEach((element) => {
        if (element.id === id) {
          const newElement = { ...element, target };
          updatedSelectedFormElements.push(newElement);
          
          if (!element.target) {
            setSelectedFormElements([...updatedSelectedFormElements]);
            setDropPosition({ x: event.clientX, y: event.clientY });
          } 
        }
      });
      if (id === 'input_file') {
        const updatedSelectedFormElements = [...selected_form_elements];
  
        available_form_elements.forEach((element) => {
          if (element.id === id) {
            const newElement = { ...element, target };
            updatedSelectedFormElements.push(newElement);
            
            if (!element.target) {
              setSelectedFormElements([...updatedSelectedFormElements]);
              setDropPosition({ x: event.clientX, y: event.clientY });
            } 
          }
        });
      }
    }
  };

  const availableFormElements = available_form_elements.map((element) => (
    <div
      className="single_element_holder"
      draggable
      key={element.id}
      onDragStart={(e) => onDragStart(e, element.id)}
    >
      <p>{element.id.replace('_', ' - ')}</p>
      {element.element}
    </div>
  ));

  const selectedFormElements = selected_form_elements.map((element, index) => (
    <div className="single_element_holder" key={element.id}>
      {element.element}
    </div>
  ));

  return (
    <div className="h-full w-full">
      <div className="h-full grid grid-cols-2">
        <div
          className="h-full border-r-2 mr-10"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, 'wip')}
        >
          <h4 className="header">Form elements</h4>
          <div className="content_container">
            <div className="elements_holder">{availableFormElements}</div>
          </div>
        </div>

        <div className="build_form_container col-md-8" onDragOver={onDragOver} onDrop={onDrop}>
          <h4 className="header">Form Building Area</h4>
          <div className="content_container form_container">
            <form className="form">
              <h5>Form Title</h5>
              <div className="w-full h-80">{selectedFormElements}</div>
              <button className="btn btn-primary submit_button" type="button">
                Submit Form
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {isMyEditorVisible && dropPosition.x && dropPosition.y && (
        <div
          style={{ position: 'absolute', top: dropPosition.y, left: dropPosition.x }}
        >
          <MyEditor />
        </div>
      )}
    </div>
  );
}
