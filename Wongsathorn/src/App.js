import React from "react";
import "./App.css";
import Axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [level, setLevel] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const [datas, setDatas] = useState([])
  const [search, setSearch] = useState("")
  const getData = async() => {
    try{
      const data = await Axios.get("http://localhost:3001/employees")
      console.log(data.data);
      setDatas(data.data)
    }
    catch(e){
      console.log(e)
    }
  };
  useEffect(() =>{
    getData();
  },[]);

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      lname: lname,
      level: level,
      contact: contact,
      age: age,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
      lname: lname,
      level: level,
      contact: contact,
      age: age,
        },
      ]);
    });
    window.location.reload();
  };



  const deleteD = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
    window.location.reload();
  };
  return (
    <div className="App">
      <div class="box"> 
        <div class="form">
        <h2>ข้อมูลนักเรียน</h2>
        <div class="inputbox">
        <input type="text" required="required" onChange={(event) => {
                setName(event.target.value)
              }}></input>
          <span>ชื่อ </span>
          <i></i>
        </div>

        <div class="inputbox">
            <input type="text" required="required"  onChange={(event) => {
                setLname(event.target.value)
              }}></input>
            <span>นามสกุล</span>
            <i></i>
          </div>

          <div class="inputbox">
          <input type="text" required="required"  onChange={(event) => {
                setLevel(event.target.value)
              }}></input>
            <span>ชั้นปี</span>
            <i></i>
          </div>
          <div class="inputbox">
            <input type="text" required="required"  onChange={(event) => {
                setContact(event.target.value)
              }}></input>
            <span>โซเชียลมีเดีย</span>
            <i></i>
          </div>

          <div class="inputbox">
            <input type="number" required="required"  onChange={(event) => {
                setAge(event.target.value)
              }}></input>
            <span>อายุ</span>
            <i></i>
          </div>

          <button type="submit" onClick={addEmployee}>เพิ่ม</button>
          

          
    </div>
  </div>
  <div className="datatext">
        
        <div className="outputtext">
        <br></br>
        <br></br>
          <h2>ข้อมูลนักเรียน</h2>
        <table class="table" id="myTable">
          <thead>
            <tr>
              <th scope="col">ลำดับ</th>
              <th scope="col">ชื่อ-สกุล</th>
              <th scope="col">ชั้น</th>
              <th scope="col">โซเชียลมีเดีย</th>
              <th scope="col">อายุ</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {datas
            .filter((t)=>{
              if(search == ""){
                return t;
              }else if (t.name.toLowerCase().includes(search.toLowerCase())){
                return t;
              }
            })
            .map((t) =>{
              return(
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.name} {t.lname}</td>
                  <td>{t.level}</td>
                  <td>{t.contact}</td>
                  <td>{t.age}</td>
                  <td><button className="btn" onClick={()=> deleteD(t.id)}>Del</button></td>
                </tr>
                
              )
            })}
          <tbody>
      
      
    </tbody>
        </tbody>
      </table>
      </div>
      </div>
</div>
  );
}

export default App;
