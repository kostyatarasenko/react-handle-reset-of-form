import { Ref, useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
  name: string;
  email: string;
};

type ExampleFormMetods = {
  resetForm: () => void;
} | null;

export function ExampleForm({
  initialValues,
  methodsRef,
}: {
  initialValues: FormValues;
  methodsRef: Ref<ExampleFormMetods>;
}) {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  // Here we add a custom method to the ref and inside imperatively do a form reset, can add something else. 
  useImperativeHandle(methodsRef, () => ({
    resetForm: () => {
      reset();
    },
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input {...register('name')} defaultValue={initialValues.name} />
      </label>

      <label>
        Email:
        <input {...register('email')} defaultValue={initialValues.email} />
      </label>

      <input type="submit" value="Submit" />
    </form>
  );
};

export default function App() {
  const methodsRef = useRef<ExampleFormMetods>(null);

  const initialValues: FormValues = { name: 'John', email: 'john@example.com' };

  const handleReset = () => {
    methodsRef.current?.resetForm();
  };

  return (
    <div>
      <ExampleForm initialValues={initialValues} methodsRef={methodsRef} />
      <button onClick={handleReset}>Reset Form</button>
    </div>
  );
};
