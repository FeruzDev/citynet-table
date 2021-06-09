import { Table } from 'antd';

import React from 'react';

// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0
const renderContent = (value, row, index) => {
    const obj = {
        children: value,
        props: {},
    };
    if (index === 4) {
        obj.props.colSpan = 0;
    }
    return obj;
};

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text, row, index) => {
            if (index < 4) {
                return <a>{text}</a>;
            }
            return {
                children: <a>{text}</a>,
                props: {
                    colSpan: 5,
                },
            };
        },
    },
    {
        title: 'Age',
        dataIndex: 'age',
        render: renderContent,
    },
    {
        title: 'Home phone',
        colSpan: 2,
        dataIndex: 'tel',
        render: (value, row, index) => {
            const obj = {
                children: value,
                props: {},
            };
            if (index === 2) {
                obj.props.rowSpan = 2;
            }
            // These two are merged into above cell
            if (index === 3) {
                obj.props.rowSpan = 0;
            }
            if (index === 4) {
                obj.props.colSpan = 0;
            }
            return obj;
        },
    },
    {
        title: 'Phone',
        colSpan: 0,
        dataIndex: 'phone',
        render: renderContent,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        render: renderContent,
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        tel: '0571-22098909',
        phone: 18889898989,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        tel: '0571-22098333',
        phone: 18889898888,
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        tel: '0575-22098909',
        phone: 18900010002,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 18,
        tel: '0575-22098909',
        phone: 18900010002,
        address: 'London No. 2 Lake Park',
    },
    {
        key: '5',
        name: 'Jake White',
        age: 18,
        tel: '0575-22098909',
        phone: 18900010002,
        address: 'Dublin No. 2 Lake Park',
    },
];


const TableRep = () => {
    return (
        <div>
            <Table columns={columns} dataSource={data} bordered />

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore nobis perspiciatis quidem! Accusamus at consectetur delectus dicta error ipsum laborum maiores maxime vel voluptates! Fuga illo iure molestiae neque numquam optio quibusdam quidem quod ullam velit? Ad adipisci aliquam eos ex illum, officiis pariatur qui quis, ratione rem veniam voluptatibus? Aperiam aut ea earum harum modi quia saepe vitae? Cum enim est laboriosam modi nostrum repellendus! Aspernatur blanditiis delectus dolorum et, in itaque iusto, minima nesciunt optio, perspiciatis quas repellat temporibus ut velit voluptates! Fuga necessitatibus porro vero! A ad consequatur deleniti est harum iusto, nihil perferendis tenetur veniam voluptate. Amet asperiores autem commodi consectetur culpa dicta dolor dolorem eos harum hic illo incidunt inventore labore nisi, optio placeat porro possimus quaerat quidem reprehenderit rerum sint unde ut velit, vero! Aliquam, aliquid blanditiis commodi distinctio dolores error eveniet molestias obcaecati porro quae quis tempora tempore voluptatum. Accusantium amet aperiam architecto assumenda atque beatae, consectetur cupiditate debitis deleniti dicta, dolore, doloribus eius explicabo facilis illo incidunt iure maxime natus neque nisi nostrum nulla perspiciatis provident repellat saepe sint unde velit vero voluptatem voluptatum. Aliquam amet atque, consequuntur cum distinctio ducimus, esse et eveniet expedita facilis hic illo, inventore ipsam laboriosam maxime molestias mollitia natus nemo nesciunt omnis quibusdam quidem reiciendis repellat sunt tempora tenetur ut voluptatem? Adipisci animi aperiam cum cumque, dicta facilis illo iste itaque maiores, maxime, mollitia neque odit optio pariatur provident quia quibusdam quis rem suscipit unde ut vel velit voluptatibus. Accusantium consectetur eligendi est iusto molestias perferendis quae recusandae sapiente vel vero. Aliquid animi atque deleniti laboriosam laborum maxime officia voluptas voluptates. Consequatur culpa cumque eaque labore, nostrum nulla quis quisquam quo temporibus totam ut vel voluptas? Ab adipisci aliquid at atque aut blanditiis commodi consectetur dignissimos dolore dolorem doloremque ea esse, ex explicabo fuga fugiat incidunt magnam minima molestias neque nesciunt odio officia officiis quas quia reprehenderit repudiandae saepe soluta suscipit temporibus ut vero vitae voluptas! Aperiam debitis error exercitationem facere magnam minima nam neque nisi optio repudiandae. Aspernatur assumenda commodi consectetur cumque dolor ea, est, et, in ipsa modi nihil non nulla officia quaerat quam tempora voluptatibus. A aliquid animi consequuntur cupiditate delectus dolor earum enim et exercitationem omnis placeat provident quam qui repellat sed sequi tempora, temporibus ullam voluptatem voluptatum. Assumenda corporis dolor dolore enim error eveniet facere impedit modi molestiae nam placeat porro sequi, temporibus tenetur velit. Beatae consequuntur, dolore est exercitationem id labore libero magni quam quos rerum. Amet at aut deserunt doloremque doloribus dolorum est exercitationem, facere iure, nesciunt non placeat quo reiciendis rem sint suscipit tenetur. Accusamus asperiores dolores nihil numquam quas quod. Accusantium aliquam at, commodi culpa deleniti dignissimos dolor dolore doloribus eaque itaque iusto nemo nobis officia officiis perferendis quibusdam reiciendis, sapiente sed, tempora ullam vel voluptate voluptatem! Aperiam architecto aspernatur aut autem consectetur consequuntur cum dolore dolores earum expedita fugiat itaque laudantium magni minima obcaecati officiis quaerat quod reiciendis repellendus saepe, sit soluta ullam veritatis. Architecto atque dolorem magni numquam ut. Corporis dicta eligendi laborum officia! Consectetur enim esse ex, fugiat hic minus nostrum! Commodi, laudantium repudiandae. Aliquid architecto consequatur cupiditate dicta eaque eius facilis hic iste maxime molestias, necessitatibus nemo nobis nulla omnis provident, reiciendis, veritatis voluptatum! Atque dolores laudantium nisi, nostrum odio perferendis quo recusandae reiciendis repellendus sint! Doloribus molestias nemo quibusdam repudiandae rerum saepe soluta ullam. Doloribus fugiat maxime sapiente. Adipisci atque distinctio eius fugiat hic inventore iure minima modi nulla quibusdam quo, veniam? Accusamus adipisci consectetur dolor eius, eligendi enim eveniet expedita explicabo facilis fugit illum ipsam iste itaque magnam omnis quaerat quo reiciendis sint tempora voluptas. Ab, animi aspernatur blanditiis consequuntur cum dolore doloribus enim esse eum eveniet itaque magni maxime minima, necessitatibus nihil obcaecati odit omnis quas, quibusdam quis tempora vel vitae voluptatem voluptates voluptatibus. Accusamus eos ipsa numquam odit sint! Consectetur error esse et id inventore, maxime, minus nesciunt odio, perferendis ratione reiciendis sit totam vel vitae voluptatum! Aperiam debitis eveniet exercitationem explicabo obcaecati, quaerat repudiandae saepe sed tempore veritatis. Alias distinctio esse est, facere illum itaque laboriosam laborum nam necessitatibus officia quam sapiente sequi temporibus ut veritatis voluptas voluptatibus? Amet beatae esse ipsum minima optio placeat recusandae. Atque autem cupiditate dolore expedita id ipsam laboriosam minus nostrum obcaecati, perferendis quisquam ratione saepe, similique soluta tempora tenetur, vel? A amet, animi consequuntur distinctio ea explicabo harum illo impedit incidunt nihil pariatur vero? Accusamus blanditiis cum ducimus eius eligendi fugiat incidunt iure laborum molestias nam nesciunt odit pariatur quam quas quia reprehenderit, repudiandae sapiente temporibus veritatis voluptatum! A accusamus at atque autem dolor dolores ea eius ex fuga fugiat harum id illum inventore iste labore laudantium molestiae nobis obcaecati officia officiis placeat porro praesentium, quaerat quas qui quibusdam ratione reprehenderit sapiente tempore vel velit veritatis voluptate voluptatem. Explicabo fugit ipsam non quo. A ad aliquid atque commodi cum, deleniti deserunt dignissimos distinctio ducimus ea eaque earum eius, enim exercitationem explicabo facilis fugit id in ipsam laborum minima necessitatibus nobis non, odit porro provident quasi qui reprehenderit repudiandae sapiente veritatis vitae voluptate voluptates. A consequuntur corporis deleniti id illo, impedit ipsam magnam molestias nisi nostrum perspiciatis, possimus quis, veritatis vitae voluptatibus! Cumque debitis distinctio dolor earum eius enim est eveniet facere laborum non possimus, quae, quia, quibusdam ratione recusandae similique ut! A, commodi dolor eaque eos est illo itaque minima nostrum, numquam quia quos repudiandae sed, tempore vel velit? Accusamus amet architecto consequatur consequuntur cupiditate ea eligendi eum ex in inventore minus nihil odio quos, reiciendis tempora. Amet aperiam commodi corporis cum cupiditate deserunt distinctio doloribus dolorum enim esse ex, inventore nam neque numquam pariatur quibusdam quisquam saepe tenetur voluptatem voluptates! Assumenda dolor dolorum exercitationem, ipsum nostrum, nulla quia repellendus saepe sapiente tempora totam ut voluptatum. Aliquid consequatur culpa dignissimos eaque et impedit in iusto laborum molestiae pariatur porro quasi quidem, recusandae repellat soluta sunt tempore totam vel voluptas voluptate. Aliquam architecto culpa cupiditate debitis dignissimos dolorem illo in labore laboriosam qui quo, repudiandae, rerum sequi totam ullam. Aliquid cupiditate enim error, illum neque nesciunt porro saepe sit. Accusamus nam quaerat rerum.</p>
        </div>
    );
};

export default TableRep;