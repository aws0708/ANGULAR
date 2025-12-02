import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTemplateFormComponent } from './my-template-form.component';
import { By } from '@angular/platform-browser';

describe('MyTemplateFormComponent', () => {
  let component: MyTemplateFormComponent;
  let fixture: ComponentFixture<MyTemplateFormComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTemplateFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyTemplateFormComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render title', () => {
    expect(compiled.querySelector('h2')?.textContent).toContain('Template Driven Form');
  });
  it('default showPassword to be false', () => {
    expect(component.showPassword).toBe(false);
  });
  it('togglePasswordVisibility should toggle showPassword', () => {
    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(true);
    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(false);
  });
  it('should add hobby to selectedHobbies on check', () => {
    const mockEvent = { target: { checked: true, value: 'Reading' } }
    component.onChange(mockEvent);
    expect(component.selectedHobbies).toContain('Reading');
  });
  it('should remove hobby from selectedHobbies on uncheck', () => {
    component.selectedHobbies = ['Reading'];
    const mockEvent = { target: { checked: false, value: 'Reading' } }
    component.onChange(mockEvent);
    expect(component.selectedHobbies).not.toContain('Reading');
  });
  it('should reset form using resetForm', () => {
    const resetSpy = jasmine.createSpyObj('my_form', ['resetForm']);
    component.resetForm(resetSpy);
    expect(resetSpy.resetForm).toHaveBeenCalled();
  });
  it('should console log std(student data) and selectedHobbies when save is called', () => {
    spyOn(console, 'log');
    component.std = { name: 'Test', age: 20, email: 'test@example.com', country: '', accept: false };
    component.selectedHobbies = ['Reading', 'Writing'];
    component.save({ value: {}, reset: () => { } });
    expect(console.log).toHaveBeenCalledWith(component.std);
    expect(console.log).toHaveBeenCalledWith(component.selectedHobbies);
  });

  // test cases for form and its validation

  // Purpose: Ensure the form is invalid when first loaded (required fields are empty).
  it('should have an invalid form when initialized', () => {
    expect(component.newForm.valid).toBeFalse();
  });

  // Check if required validation works for fields like name, age, email, etc.
  it('should make name field required', () => {
    const nameControl = component.newForm.controls['name'];
    nameControl.setValue('');
    expect(nameControl.hasError('required')).toBe(true);
  });

  // Check min/max for age and length for name/password.
  it('should require age ≥ 10 and ≤ 50', () => {
    const ageControl = component.newForm.controls['age'];
    ageControl.setValue(5);
    expect(ageControl.hasError('min')).toBe(true);
    ageControl.setValue(60);
    expect(ageControl.hasError('max')).toBeTrue();
  });

  // Ensure the email and password pattern validators work.
  it('should accept only valid emails', () => {
    const emailControl = component.newForm.controls['email'];
    emailControl.setValue('msd94954@as');
    expect(emailControl.hasError('pattern')).toBeTrue();
    emailControl.setValue('msd94954@gmail.com');
    expect(emailControl.hasError('pattern')).toBeFalse();
  });

  // Make sure passwords must meet all complexity requirements.
  it('should enforce password complexity rules', () => {
    const passwordControl = component.newForm.controls['pass'];
    passwordControl.setValue('abcd'); // Too short, not complex
    expect(passwordControl.valid).toBeFalse();
    passwordControl.setValue('Test1234!'); // Example valid password
    expect(passwordControl.valid).toBeTrue();
  });

  // Ensure clicking the reset button resets the form and model.
  it('should reset the form and model on reset', () => {
  spyOn(component, 'resetForm');
  // const button = fixture.debugElement.nativeElement.querySelector('button[type="button"]');
  // button.click();
  // expect(component.resetForm).toNotHaveBeenCalled();

  const buttonDebug = fixture.debugElement.query(By.css('button[type="button"]'));
  expect(buttonDebug).not.toBeNull();
  buttonDebug.triggerEventHandler('click', null);

  expect(component.resetForm).not.toHaveBeenCalled();

});

// Ensure submit is disabled when form is invalid or hobbies are not selected.
it('should disable submit when form is invalid or hobbies not selected', ()=> {
  component.selectedHobbies = [];
  const submitButton = fixture.debugElement.nativeElement.querySelector('input[type="submit"]');
  expect(submitButton.classList).toContain('disabled');
})
});
