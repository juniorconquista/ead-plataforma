import React, { memo } from 'react';

import { ReactComponent as IconLeft } from '../../../assets/icons/esquerda.svg';
import { ReactComponent as IconRight } from '../../../assets/icons/direita.svg';

import Button from '../../shared/Button';
import './style.scss';

const AdminSlide = () => (
    <div className="slide__content-admin">
        <h1>Gerenciar slide</h1>
        <div className="slide__content">
            <div className="send-slide">
                <Button type="submit" text="Enviar slide" />
            </div>
            <div className="slide">
                <IconLeft />
                <div className="presentation" />
                <IconRight />
            </div>
        </div>
    </div>
);

export default memo(AdminSlide);
