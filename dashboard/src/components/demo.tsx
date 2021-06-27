import {Link} from 'umi';
import { Alert } from 'antd';

type IWidget1Props ={
  message: String
}

export const Widget1 = ({message}: IWidget1Props) => {
  return (
    <div>
      bla bla bla
      <Alert message={message} type="success" />
    </div>
  );
}

export const Widget2 = ({}) => {
  return (
    <div>
      bla bla bla
      <Alert message="Widget 2" type="error" />
    </div>
  );
}

type IWidgetCourseInfo ={
  title: string,
  course_id:number,
  teacher_name:string,
}

export const WidgetCourseInfo = (course: IWidgetCourseInfo) => {
  return (
    <div>
      课程名称
      <Alert message={course.title} type="success" />
      课程id：{course.course_id}<br />
      授课教师：{course.teacher_name}<br />
    </div>
  );
}

type IWidgetArticle ={
  text: string
}
export const WidgetCourseContent = (course: IWidgetArticle) => {
  return (
    <div>
      <h2>课程内容</h2>
      <WidgetWikiPaliArticle text={course.text} />
    </div>
  );
}


export const WidgetWikiPaliArticle = (content: IWidgetArticle) => {
  return (
    <div>
      <p>wikipali article content</p>
      {content.text}
    </div>
  );
}

export const WidgetWikiPaliArticleEdit = (content: IWidgetArticle) => {
  return (
    <div>
      <p>wikipali article content edit</p>
      <textarea>{content.text}</textarea>
    </div>
  );
}