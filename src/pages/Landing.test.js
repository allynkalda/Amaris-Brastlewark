import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import Landing from './Landing';
import SelectBy from '../component/SelectBy'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Landing />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should render title', () => {
    const renderer = TestRenderer.create(<Landing />);
    const component = renderer.root;
    const h2 = component.findByType('h2');
    expect(h2.props.children).toBe('Gnomester');
    expect(h2.props.className).toContain('header');
});

it('should render two selects', () => {
    const renderer = TestRenderer.create(<Landing />);
    const component = renderer.root;
    const selectComp = component.findAllByType(SelectBy);
    expect(selectComp.length).toBe(2);
    expect(selectComp[0].props.type).toBe('age');
    expect(selectComp[1].props.type).toBe('hair');
});