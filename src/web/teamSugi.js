import React, { Component , Fragment} from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField'

class TeamSugi extends Component {
    
    handleDelete = (seq) =>{
        const { deleteItem } = this.props
        deleteItem(seq)
    }
    renderList = () => {
        const { sugiList } = this.props
        const {handleDelete} = this
        if(sugiList){
            return(
                <Fragment>
                    {
                        sugiList.map((item, index) => {
                        return (
                            <div key={index}>
                                 <ul className="list_wrap">
                                    <li id="liNm157">
                                        <div className="title_wrap">    
                                            <p>{item.s_name}</p>
                                            <p>{item.s_univ} {item.s_major} 합격</p>
                                            <p>{item.code_name}</p>
                                        </div>
                                        <p className="team_contents">
                                            {item.s_content}
                                        </p>
                                        <div style={{textAlign:'right'}}>
                                            <Button
                                                id={item.s_seq}
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<DeleteIcon />}
                                                onClick={handleDelete.bind(this, item.s_seq)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </li>
                                </ul>
                            </div> 
                        )
                    })
                }
                </Fragment>
            )
        }
    }
    render() { 
        const { saveItem, handleChange, name, univ, major, code_name, title, content } = this.props
        return ( 
        <Fragment>
            <div className = "container"> 
                <div id="div_cont">
                    <div id="div_full" className="div_con taL">
                        <div className="div_con2">
                            <div className="con">
                                <div >
                                    <Card  variant="outlined" style={{minHeight:'200px', backgroundColor:'#fffff1', paddingBottom:'10px'}}>
                                        <CardContent>
                                            <TextField id="name" label="이름"  style={{width:'25ch', margin: '5px'}} name="name" value={name} onChange={handleChange}  />
                                            <TextField id="univ" label="대학교"  style={{width:'25ch', margin: '5px'}}  name="univ"  value={univ} onChange={handleChange} />
                                            <TextField id="major" label="전공"  style={{width:'25ch', margin: '5px'}} name="major"  value={major} onChange={handleChange} />
                                            <TextField id="code_name" label="소속(ex. 강남팀플)" style={{width:'25ch', margin: '5px'}} name="code_name" value={code_name} 
                                                onChange={handleChange} required/>
                                        </CardContent>
                                        < CardContent>
                                        <TextField id="title" label="title" style={{width:'100ch', margin: '5px'}}  value={title} name="title" onChange={handleChange}  />
                                        <TextField
                                            id="content"
                                            label="후기 내용"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            value={content}
                                            name ="content" 
                                            onChange={handleChange}
                                            style={{width:'100ch', margin: '5px'}}
                                            required/>
                                        </CardContent>
                                        <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<SaveIcon  />}
                                                onClick={saveItem}
                                            >
                                                Save
                                        </Button>
                                    </Card>
                                </div>
                                {this.renderList()}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
        );
    }
}
export default TeamSugi;