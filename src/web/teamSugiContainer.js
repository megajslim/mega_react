import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators  } from 'redux'
import { ActionTypes, teamSugiActions } from '../modules'
import TeamSugi  from '../web/teamSugi' 
import { isUndefined } from 'lodash/lang'
import {hasApiServiceError} from '../utils/api'

class TeamSugiContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasExceptionError: false,
            name: "",
            univ:"",
            major:"",
            code_name:"",
            title:"",
            content:""
        }
    }

    componentDidMount() {
        this.getTeamSugi()
    }

    scrollToTop = () => {
        window.scroll({ top: 0, behavior: 'smooth'})
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    deleteItem = (seq) => {
         if(window.confirm("삭제하시겠습니까?")){
            this.setDeleteSugi(seq);
         }
    }

    saveItem = async() => {
        const { Actions } = this.props
        const { name, univ, major, code_name, title, content } = this.state
        const params = {
            s_CODENAME: code_name,
            s_NAME : name, 
            s_UNIV : univ,
            s_MAJOR : major,
            s_DEPT_TYPE : "인문계열",
            s_TYPE : "정시",
            s_SUBJECT : title,
            s_CONTENT : content,
            s_MAINYN : "Y",
            s_YEAR : "2020"
        }
        try{
            const apiService = Actions.saveSugi(params)
            const response = await apiService
            if (!isUndefined(response) && !isUndefined(response.data)) {
                const responseJson = response.data
                console.log(responseJson)
                const hasError = hasApiServiceError({
                    errcode: responseJson.errCode,
                    errmsg: responseJson.errMsg,
                })
                if (hasError.error) {
                    alert("서버에서 오류가 발생되었습니다.");
                } else {
                    alert("등록되었습니다.");
                    this.getTeamSugi();
                    
                } 
            } else {
                alert("데이터 처리에 문제가 발생하였습니다.");
            }
        }catch(ex){
            throw Error(ex)
        }
    }

    setDeleteSugi = async(seq) =>{
        const { Actions } = this.props
        try{
            const apiService = Actions.deleteSugi(seq)
            const response = await apiService
            if (!isUndefined(response) && !isUndefined(response.data)) {
                const responseJson = response.data
                console.log(responseJson)
                const hasError = hasApiServiceError({
                    errcode: responseJson.errCode,
                    errmsg: responseJson.errMsg,
                })
                if (hasError.error) {
                    alert("서버에서 오류가 발생되었습니다.");
                } else {
                    alert("삭제되었습니다.");
                    this.getTeamSugi();
                } 
            } else {
                alert("데이터 처리에 문제가 발생하였습니다.");
            }
        }catch(ex){
            throw Error(ex)
        }
    }

    getTeamSugi = async() => {
        const params = { uid: 'test'}
        const { Actions } = this.props
        try{
            const apiService = Actions.sugiInfo(params)
            const response = await apiService
            if (!isUndefined(response) && !isUndefined(response.data)) {
                const responseJson = response.data
                console.log(responseJson)
                const hasError = hasApiServiceError({
                    errcode: responseJson.errCode,
                    errmsg: responseJson.errMsg,
                })
                if (hasError.error) {
                    alert("서버에서 오류가 발생되었습니다.");
                } else {
                    const sugiList = responseJson.sugiList.map((sugiItem, index) => {
                        
                        const code_name = sugiItem.s_CODENAME;
                        const s_name = sugiItem.s_NAME;
                        const s_univ = sugiItem.s_UNIV;
                        const s_dept_type = sugiItem.s_DEPT_TYPE;
                        const s_major = sugiItem.s_MAJOR;
                        const s_type = sugiItem.s_TYPE;
                        const s_content = sugiItem.s_CONTENT;
                        const s_seq = sugiItem.seq;
                        
                        return { 
                            code_name : code_name, 
                            s_name : s_name, 
                            s_univ : s_univ, 
                            s_dept_type : s_dept_type, 
                            s_major : s_major,
                            s_type : s_type,
                            s_content : s_content,
                            s_seq : s_seq
                        }
                    })
                    this.setState({ 
                        sugiList : sugiList,
                        name: "",
                        univ:"",
                        major:"",
                        code_name:"",
                        title:"",
                        content:""
                        }, () => {
                        this.scrollToTop()
                    })
                } 
            } else {
                alert("데이터를 정상적으로 조회하지 못했습니다.");
            }
        }catch(ex){
            throw Error(ex)
        }

    }

    render() {
        const {sugiList, name, univ, major, code_name, title, content} = this.state
        const {deleteItem, saveItem, handleChange} = this
        return (
            <TeamSugi sugiList = {sugiList} 
                deleteItem = {deleteItem} 
                saveItem = {saveItem}
                handleChange = {handleChange}
                name={name}
                univ={univ}
                major={major}
                code_name={code_name}
                title={title}
                content={content}
            >
            </TeamSugi>
        );
    }
}

const mapStateToProps = state => {
    const classType = ActionTypes.req.TeamSugiInfo
    return {
        loading: state.pender.pending[classType],
        error: state.pender.failure[classType],
    }
}

const mapDispatchToProps = dispatch => ({
    Actions: bindActionCreators({
        ...teamSugiActions
    }, dispatch) 
})
export default (connect(mapStateToProps, mapDispatchToProps)(TeamSugiContainer))