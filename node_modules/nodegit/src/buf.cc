// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/buf.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

  #include "../include/git_buf_converter.h"
 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitBuf::~GitBuf() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
                     }

  void GitBuf::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("Buf").ToLocalChecked());

          Nan::SetPrototypeMethod(tpl, "containsNul", ContainsNul);
            Nan::SetPrototypeMethod(tpl, "dispose", Dispose);
            Nan::SetPrototypeMethod(tpl, "grow", Grow);
            Nan::SetPrototypeMethod(tpl, "isBinary", IsBinary);
            Nan::SetPrototypeMethod(tpl, "set", Set);
           Nan::SetPrototypeMethod(tpl, "ptr", Ptr);
         Nan::SetPrototypeMethod(tpl, "asize", Asize);
         Nan::SetPrototypeMethod(tpl, "size", Size);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("Buf").ToLocalChecked(), _constructor_template);
  }

  
/*
     * @return Number  result    */
NAN_METHOD(GitBuf::ContainsNul) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitBuf>(info.This())->GetValue()
    );

 int result =     git_buf_contains_nul(
          Nan::ObjectWrap::Unwrap<GitBuf>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
     */
NAN_METHOD(GitBuf::Dispose) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitBuf>(info.This())->GetValue()
    );

    git_buf_dispose(
          Nan::ObjectWrap::Unwrap<GitBuf>(info.This())->GetValue()
    );

      return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
  }
}
   
/*
   * @param Number target_size
     */
NAN_METHOD(GitBuf::Grow) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsNumber()) {
    return Nan::ThrowError("Number target_size is required.");
  }

// start convert_from_v8 block
  size_t from_target_size;
      from_target_size = (size_t)   info[0].As<v8::Number>()->Value();
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitBuf>(info.This())->GetValue()
    );

 int result =     git_buf_grow(
          Nan::ObjectWrap::Unwrap<GitBuf>(info.This())->GetValue()
,          from_target_size
    );

      if (result != GIT_OK) {

        if (git_error_last()) {
          return Nan::ThrowError(git_error_last()->message);
        } else {
          return Nan::ThrowError("Unknown Error");
        }
      } // lock master scope end
      return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
  }
}
   
/*
     * @return Number  result    */
NAN_METHOD(GitBuf::IsBinary) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitBuf>(info.This())->GetValue()
    );

 int result =     git_buf_is_binary(
          Nan::ObjectWrap::Unwrap<GitBuf>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
   * @param Buffer data
   * @param Number datalen
     */
NAN_METHOD(GitBuf::Set) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsObject()) {
    return Nan::ThrowError("Buffer data is required.");
  }

  if (info.Length() == 1 || !info[1]->IsNumber()) {
    return Nan::ThrowError("Number datalen is required.");
  }

// start convert_from_v8 block
  const void * from_data = NULL;

  from_data = Buffer::Data(Nan::To<v8::Object>(info[0]).ToLocalChecked());
// end convert_from_v8 block
// start convert_from_v8 block
  size_t from_datalen;
      from_datalen = (size_t)   info[1].As<v8::Number>()->Value();
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitBuf>(info.This())->GetValue()
            ,
              from_data
    );

 int result =     git_buf_set(
          Nan::ObjectWrap::Unwrap<GitBuf>(info.This())->GetValue()
,          from_data
,          from_datalen
    );

      if (result != GIT_OK) {

        if (git_error_last()) {
          return Nan::ThrowError(git_error_last()->message);
        } else {
          return Nan::ThrowError("Unknown Error");
        }
      } // lock master scope end
      return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
  }
}
       // start field block
    NAN_METHOD(GitBuf::Ptr) {
      v8::Local<v8::Value> to;

            char *
           ptr =
          Nan::ObjectWrap::Unwrap<GitBuf>(info.This())->GetValue()->ptr;
 // start convert_to_v8 block
  if (ptr){
       to = Nan::New<v8::String>(ptr).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
    // end field block
     // start field block
    NAN_METHOD(GitBuf::Asize) {
      v8::Local<v8::Value> to;

            size_t
           asize =
          Nan::ObjectWrap::Unwrap<GitBuf>(info.This())->GetValue()->asize;
 // start convert_to_v8 block
     to = Nan::New<Number>( asize);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
    // end field block
     // start field block
    NAN_METHOD(GitBuf::Size) {
      v8::Local<v8::Value> to;

            size_t
           size =
          Nan::ObjectWrap::Unwrap<GitBuf>(info.This())->GetValue()->size;
 // start convert_to_v8 block
     to = Nan::New<Number>( size);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
    // end field block
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitBufTraits>;
 