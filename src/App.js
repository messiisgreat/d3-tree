import React, { useEffect, useMemo, useState } from "react";
import Tree from "react-d3-tree";
import orgChartJsonss from "./data/names.json";
import { useCenteredTree } from "./helpers";
import "./styles.css";
import { addColor, addNode, getPath, getTree } from "./util/recursive";
import VideoPlayerList from "./VideoPlayerList";
const containerStyles = {
  width: "100vw",
  height: "50vh"
};

// Here we're using `renderCustomNodeElement` to represent each node
// as an SVG `rect` instead of the default `circle`.

const renderRectSvgNode = ({ nodeDatum, onClickHandle2 }) => {
  return (
  <g>
    <circle r="10"  onContextMenu={() => onClickHandle2(nodeDatum)} style={{ fill: `${nodeDatum.color??'blue'}` }}/>
    <text fill="black" id="txt" strokeWidth="1" x="20">
      {nodeDatum.name}
    </text>
    {/* {nodeDatum.attributes?.department && (
      <text fill="black" x="20" dy="20" strokeWidth="1">
        Department: {nodeDatum.attributes?.department}
      </text>
    )} */}
  </g>
)};

const TreeView = (props) => {
  return useMemo(() => <Tree
    data={props.orgChartJson}
    translate={props.translate}
    renderCustomNodeElement={(_props) => renderRectSvgNode({ ..._props, onClickHandle2: props.handleClick2 })}
    orientation={props.orientation}
  />, [props.orgChartJson, props.translate, props.handleClick2])
}

export default function App() {
  const [id, setId] = useState("1");
  const [orgChartJson, setOrgChartJson] = useState({});
  const [translate, containerRef] = useCenteredTree();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [displaying, setDisplaying] = useState(false);
  const [visible, setVisible]  = useState(false);
  const [startKey, setStartKey] = useState();
  const [endKey, setEndKey] = useState();
  const [selectorgChart, setSelectorgChart] = useState({});
  const handleClick2 = (nodeDatum) => {
    setVisible(true);
    setId(nodeDatum.key);
  }
  const insert = () => {
    const res = prompt();
    if(res){
      const updatedOrgChartJson = addNode(id, orgChartJson, res)
      setOrgChartJson(updatedOrgChartJson)
    }
    
  }
  const start = () => {
    // setStartKey(id);
    // checkFunc();
    // const updatedOrgChartJson = addColor(id, orgChartJson)
    // setOrgChartJson(updatedOrgChartJson)
  }
  const end = () => {
    // setEndKey(id)
    // const path = getPath(orgChartJson, startKey, id)
    // checkFunc();
    setDisplaying(true)
    const updateSelectOrgChart = getTree(id, orgChartJson);
    console.log(updateSelectOrgChart)
    setSelectorgChart(updateSelectOrgChart);
  }
  const checkFunc = () => {
    if(startKey!=null && endKey!=null)
      alert(endKey);
  }
  const onMouseLeaveHandle = () => {
    setVisible(false)
  }
  useEffect(() => {
    setOrgChartJson(orgChartJsonss);
  }, [])
  useEffect(() => {
    const contextHandler = (event) => {
      event.preventDefault();
      const x = event.clientX;
      const y = event.clientY;
      setX(x);
      setY(y);
    }
    document.addEventListener('contextmenu', contextHandler);
    return () => {
      document.removeEventListener('contextmenu', contextHandler);
    }
  }, [setX, setY, document]);
  return (
    <div>
      <div className="container">
      <div className="innercontain" style={containerStyles} ref={containerRef}>
      <TreeView orgChartJson={orgChartJson} translate={translate} handleClick2={handleClick2} orientation = "vertical" />
      

      {visible && 
        <div style={{position: "absolute", top: y - 20, left: x -20, paddingLeft: 20, paddingTop: 20}} onMouseLeave={onMouseLeaveHandle}>
          <div className="dropdown_pannel">
            <div className="dropdown_li" onClick={insert}>insert</div>
            <div className="dropdown_li" onClick={start}>start</div>
            <div className="dropdown_li" onClick={end}>end</div>
          </div>
        </div>
      }
    </div>
    </div>
    <div className = "flowcontain">
    {displaying && <TreeView orgChartJson={selectorgChart} translate={translate} orientation="horizontal"/>}
    </div >
    
      <VideoPlayerList/>
    </div>
    
    
    
  );
}
