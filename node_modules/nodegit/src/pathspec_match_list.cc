// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/pathspec_match_list.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

  #include "../include/diff_delta.h"
 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitPathspecMatchList::~GitPathspecMatchList() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
                     }

  void GitPathspecMatchList::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("PathspecMatchList").ToLocalChecked());

          Nan::SetPrototypeMethod(tpl, "diffEntry", DiffEntry);
            Nan::SetPrototypeMethod(tpl, "entry", Entry);
            Nan::SetPrototypeMethod(tpl, "entrycount", Entrycount);
            Nan::SetPrototypeMethod(tpl, "failedEntry", FailedEntry);
            Nan::SetPrototypeMethod(tpl, "failedEntrycount", FailedEntrycount);
    
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("PathspecMatchList").ToLocalChecked(), _constructor_template);
  }

  
/*
   * @param Number pos
     * @return DiffDelta  result    */
NAN_METHOD(GitPathspecMatchList::DiffEntry) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsNumber()) {
    return Nan::ThrowError("Number pos is required.");
  }

// start convert_from_v8 block
  size_t from_pos;
      from_pos = (size_t)   info[0].As<v8::Number>()->Value();
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitPathspecMatchList>(info.This())->GetValue()
    );

 const git_diff_delta * result =     git_pathspec_match_list_diff_entry(
          Nan::ObjectWrap::Unwrap<GitPathspecMatchList>(info.This())->GetValue()
,          from_pos
    );

        // null checks on pointers
        if (!result) {
          return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
        }

      v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (result != NULL) {
      v8::Local<v8::Array> owners = Nan::New<Array>(0);
            Nan::Set(owners, owners->Length(), info.This());
          to = GitDiffDelta::New(
        result,
        false
          , owners
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
   * @param Number pos
     * @return String  result    */
NAN_METHOD(GitPathspecMatchList::Entry) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsNumber()) {
    return Nan::ThrowError("Number pos is required.");
  }

// start convert_from_v8 block
  size_t from_pos;
      from_pos = (size_t)   info[0].As<v8::Number>()->Value();
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitPathspecMatchList>(info.This())->GetValue()
    );

 const char * result =     git_pathspec_match_list_entry(
          Nan::ObjectWrap::Unwrap<GitPathspecMatchList>(info.This())->GetValue()
,          from_pos
    );

        // null checks on pointers
        if (!result) {
          return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
        }

      v8::Local<v8::Value> to;
// start convert_to_v8 block
  if (result){
       to = Nan::New<v8::String>(result).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
     * @return Number  result    */
NAN_METHOD(GitPathspecMatchList::Entrycount) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitPathspecMatchList>(info.This())->GetValue()
    );

 size_t result =     git_pathspec_match_list_entrycount(
          Nan::ObjectWrap::Unwrap<GitPathspecMatchList>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
   * @param Number pos
     * @return String  result    */
NAN_METHOD(GitPathspecMatchList::FailedEntry) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsNumber()) {
    return Nan::ThrowError("Number pos is required.");
  }

// start convert_from_v8 block
  size_t from_pos;
      from_pos = (size_t)   info[0].As<v8::Number>()->Value();
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitPathspecMatchList>(info.This())->GetValue()
    );

 const char * result =     git_pathspec_match_list_failed_entry(
          Nan::ObjectWrap::Unwrap<GitPathspecMatchList>(info.This())->GetValue()
,          from_pos
    );

        // null checks on pointers
        if (!result) {
          return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
        }

      v8::Local<v8::Value> to;
// start convert_to_v8 block
  if (result){
       to = Nan::New<v8::String>(result).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
     * @return Number  result    */
NAN_METHOD(GitPathspecMatchList::FailedEntrycount) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitPathspecMatchList>(info.This())->GetValue()
    );

 size_t result =     git_pathspec_match_list_failed_entrycount(
          Nan::ObjectWrap::Unwrap<GitPathspecMatchList>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
    // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitPathspecMatchListTraits>;
 