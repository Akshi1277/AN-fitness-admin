'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export function Form({
  schema,
  defaultValues,
  onSubmit,
  fields,
  submitText = 'Submit',
  className,
  ...props
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={cn('space-y-6', className)}
      {...props}
    >
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            type={field.type || 'text'}
            {...register(field.name)}
            placeholder={field.placeholder}
            disabled={isSubmitting}
          />
          {errors[field.name] && (
            <p className="text-sm text-red-500">
              {errors[field.name].message}
            </p>
          )}
        </div>
      ))}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : submitText}
      </Button>
    </form>
  );
}
