import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import {
    Empty,
    Tooltip,
    message,
    Drawer,
    Button,
    Form,
    Input,
    Select,
    InputNumber,
  } from "antd";
export default function Modal(props) {
    return (
        <div>
            <Drawer     
            title="Thông tin nhận hàng"
            width={600}
            placement="right"
            closable={false}
            onClose={props.checkclose}
            visible={true}>ok</Drawer>
        </div>
    )
}
