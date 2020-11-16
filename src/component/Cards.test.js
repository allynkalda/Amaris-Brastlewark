import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import Cards from './Cards';

const card = <Cards placeholder="test" src="test" alt="test" age="8" height="12" hairColor="white" professions={[1,1]} friends={[1,1]}/>;
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(card, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should render label', () => {
    const renderer = TestRenderer.create(card);
    const component = renderer.root;
    const h2 = component.findByType('h2');
    expect(h2.props.children).toBe("test");
});

it('should render all info', () => {
    const renderer = TestRenderer.create(card);
    const component = renderer.root;
    const p = component.findAllByType('p');
    expect(p.length).toBe(5);
});

it('should render age', () => {
    const renderer = TestRenderer.create(card);
    const component = renderer.root;
    const p = component.findAllByType('p');
    expect(p[0].props.children[0]).toBe("Age: ");
    expect(p[0].props.children[1]).toBe("8");
});