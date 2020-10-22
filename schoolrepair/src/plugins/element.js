import Vue from 'vue'

import {
    Form,
    FormItem,
    Input,
    Button,
    Message,
    Dialog,
    MessageBox,
    Col,
    Row,
    Menu,
    MenuItem,
    Container,
    Header,
    Main,
    Footer,
    Card,
    Table,
    TableColumn,
    Tag


} from 'element-ui';


Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Col)
Vue.use(Row)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Main)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox