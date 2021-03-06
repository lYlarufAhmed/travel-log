import React, {useState, FC, ReactElement} from 'react';
import {useForm} from 'react-hook-form';

import {createLogEntry} from './API';
import {FormLogEntry, GEOCoordinate} from "./types";

type LogEntryFormProps = {
    location: GEOCoordinate;
    onClose: () => void;
}

const LogEntryForm: FC<LogEntryFormProps> = ({location, onClose}): ReactElement => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {register, handleSubmit} = useForm();

    const onSubmit = async (data: FormLogEntry) => {
        try {
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            await createLogEntry(data);
            onClose();
        } catch (error) {
            console.error(error);
            // @ts-ignore
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form" style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            {error ? <h3 className="error">{error}</h3> : null}
            <label htmlFor="title">Title</label>
            <input required {...register("title")} />
            <label htmlFor="comments">Comments</label>
            <textarea rows={3} {...register("comments")}/>
            <label htmlFor="description">Description</label>
            <textarea rows={3} {...register("description")}/>
            <label htmlFor="image">Image</label>
            <input {...register('image')}/>
            <label htmlFor="visitDate">Visit Date</label>
            <input type="date" required {...register("visitDate")}/>
            <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
        </form>
    );
};

export default LogEntryForm;