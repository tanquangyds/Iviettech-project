import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { Empty, Tooltip, message, Drawer, Button, Form, Input, Select, InputNumber } from 'antd';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        {props.name}
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <div className="group-check-out">

<Drawer
    title="Thông tin nhận hàng"
    width={500}
    // onClose={onClose}
    // visible={visible}
    className="container-checkout"
>
    <Form
        // {...formItemLayout}
        // form={form}
        // onFinish={onFinish}
    >
        <Form.Item
            name="city"
            label="Tỉnh/Thành phố"
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Vui lòng chọn tỉnh hoặc thành phố bạn ở !',
                },
            ]}
        >
            <Select
                showSearch
                placeholder="Tỉnh/Thành phố"
                optionFilterProp="children"
                onChange={onChangeCity}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {
                    dataCity.map((city, index) => (
                        <Option value={city.name} key={index}>{city.name}</Option>
                    ))
                }
            </Select >
        </Form.Item>

        <Form.Item
            name="district"
            label="Quận/Huyện"
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Vui lòng chọn quận hoặc huyện nơi bạn !',
                },
            ]}
        >
            <Select
                showSearch
                placeholder="Quận/Huyện"
                optionFilterProp="children"
                onChange={onChangeDistrict}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {
                    dataCity.map((itemCity, index) => itemCity.name === city && (
                        itemCity.huyen.map((huyen) => (
                            <Option value={huyen.name} key={index}>{huyen.name}</Option>
                        ))
                    ))
                }
            </Select >
        </Form.Item>
        <Form.Item
            name="commune"
            label="Xã/Thị Trấn"
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Vui lòng chọn xã bạn ở !',
                },
            ]}
        >
            <Select
                showSearch
                placeholder="Xã/Thị Trấn"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {
                    dataCity.map(itemCity => itemCity.name === city && (
                        itemCity.huyen.map(huyen => huyen.name === district && (
                            huyen.xa.sort().map((xa, index) => (
                                <Option value={xa.name} key={index}>{xa.name}</Option>
                            ))
                        ))
                    ))
                }
            </Select >
        </Form.Item>
        <Form.Item
            name="incubation"
            label="Ấp/Số Nhà/Tên Đường"
            rules={[
                {
                    required: true,
                    message: 'Địa chỉ cụ thể !',
                }
            ]}
        >
            <TextArea
                placeholder="địa chỉ cụ thể: ấp, số nhà, tên đường..."
                rows={4}
            />
        </Form.Item>
        <Form.Item
            name="numberPhome"
            label="Số Điện Thoại"
            className="group-phone"
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập đúng số điện thoại !',
                }
            ]}
        >
            <InputNumber type="number" />
        </Form.Item>

        <Form.Item
            name="payment"
            label="Thanh toán"
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Vui lòng chọn phuong thức thanh toán',
                },
            ]}
        >
            <Select
                placeholder="Thanh toán khi nhận hàng"
            >
                <Option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</Option>
            </Select >
        </Form.Item>
        <Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                className="btn-register"
            >
                Hoàn tất
                    </Button>
        </Form.Item>
    </Form>
</Drawer>

</div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
