import React from 'react'
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
export default function modal() {
    return (
        <div>
            <Drawer title="Thông tin nhận hàng"
                        width={600}
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        visible={visible}>ok</Drawer>
        </div>
    )
}