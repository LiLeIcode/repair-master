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
    Tag,
    Select,
    Option,
    RadioGroup,
    Radio,
    Pagination,
    Carousel,
    CarouselItem


} from 'element-ui';


Vue.use(Carousel)
Vue.use(CarouselItem)
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
Vue.use(Select)
Vue.use(Option)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Pagination)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox